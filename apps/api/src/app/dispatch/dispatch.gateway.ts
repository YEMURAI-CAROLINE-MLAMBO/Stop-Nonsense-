import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DispatchService } from './dispatch.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DispatchGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly dispatchService: DispatchService) {}

  @SubscribeMessage('updateLocation')
  async handleUpdateLocation(
    @MessageBody() data: { lat: number; lng: number; responderId: string },
    @ConnectedSocket() client: Socket
  ) {
    await this.dispatchService.updateResponderLocation(data.responderId, data.lat, data.lng);
  }

  @SubscribeMessage('toggleDuty')
  async handleToggleDuty(
    @MessageBody() data: { responderId: string; isOnline: boolean },
    @ConnectedSocket() client: Socket
  ) {
    await this.dispatchService.updateResponderStatus(data.responderId, data.isOnline);
    if (data.isOnline) {
      client.join(`responder_${data.responderId}`);
    } else {
      client.leave(`responder_${data.responderId}`);
    }
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
    const responders: any[] = await this.dispatchService.findNearestResponders(
      data.lat,
      data.lng,
      5 // 5km radius
    );

    // Notify targeted responders
    responders.forEach(responder => {
      this.server.to(`responder_${responder.id}`).emit('newIncident', {
        incidentId: incident.id,
        address: incident.address,
        lat: incident.lat,
        lng: incident.lng,
        accessMethod: incident.accessMethod,
      });
    });

    // SMS Fallback logic (Placeholder)
    if (responders.length === 0) {
      console.warn('No online responders found! Triggering SMS fallback to backup services.');
      // Here you would call a service like Twilio to alert a 24/7 backup control room.
    }

    // In a real production app, we would also trigger Push Notifications.
    console.log(`Dispatched incident ${incident.id} to ${responders.length} responders.`);

    return { incidentId: incident.id, status: 'DISPATCHING' };
  }

  // Voice Context recording placeholder
  @SubscribeMessage('uploadAudioContext')
  async handleAudioContext(
    @MessageBody() data: { incidentId: string; audioBase64: string }
  ) {
    console.log(`Received audio context for incident ${data.incidentId}`);
    // Save to S3 and link to incident
  }
}
