import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DispatchService } from './dispatch.service';
import { PredictiveDispatchService } from './predictive-dispatch.service';
import { AccessCoordinationService } from './access-coordination.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DispatchGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly dispatchService: DispatchService,
    private readonly predictiveDispatchService: PredictiveDispatchService,
    private readonly accessCoordinationService: AccessCoordinationService
  ) {}

  @SubscribeMessage('getPredictiveHotspots')
  async handleGetPredictiveHotspots() {
    const hotspots = await this.predictiveDispatchService.getPredictiveHotspots();
    this.server.emit('predictiveHotspotsUpdate', hotspots);
    return hotspots;
  }

  @SubscribeMessage('coordinateAccess')
  async handleCoordinateAccess(
    @MessageBody() data: { incidentId: string; address: string; contactType: string }
  ) {
    const coordination = await this.accessCoordinationService.coordinateAccess(
      data.incidentId,
      data.address,
      data.contactType
    );
    this.server.emit('accessCoordinationUpdate', coordination);
    return coordination;
  }

  @SubscribeMessage('updateLocation')
  async handleUpdateLocation(
    @MessageBody() data: { lat: number; lng: number; responderId: string },
    @ConnectedSocket() client: Socket
  ) {
    // In a real app, we'd use the authenticated user from the socket
    console.log(`Location update from ${data.responderId}: ${data.lat}, ${data.lng}`);
    // Update responder location in DB (omitted for brevity in this step)
  }

  @SubscribeMessage('triggerPanic')
  async handleTriggerPanic(
    @MessageBody() data: { userId: string; lat: number; lng: number; address: string },
    @ConnectedSocket() client: Socket
  ) {
    const incident = await this.dispatchService.createIncident(
      data.userId,
      data.lat,
      data.lng,
      data.address
    );

    // Find nearest responders
    const responders = await this.dispatchService.findNearestResponders(
      data.lat,
      data.lng,
      5 // 5km radius
    );

    // Notify responders (this would use push notifications or web sockets)
    this.server.emit('newIncident', {
      incidentId: incident.id,
      address: incident.address,
      lat: incident.lat,
      lng: incident.lng,
    });

    return { incidentId: incident.id, status: 'DISPATCHING' };
  }
}
