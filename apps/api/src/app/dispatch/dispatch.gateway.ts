import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { PredictiveDispatchService } from './predictive-dispatch.service';
import { AccessCoordinationService } from './access-coordination.service';
import {
  PanicTriggerSchema,
  CoordinateAccessSchema,
  LocationUpdateSchema
} from '@instant-guard/validation';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DispatchGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(DispatchGateway.name);

  constructor(
    private readonly dispatchService: DispatchService,
    private readonly predictiveDispatchService: PredictiveDispatchService,
    private readonly accessCoordinationService: AccessCoordinationService
  ) {}

  @SubscribeMessage('getPredictiveHotspots')
  async handleGetPredictiveHotspots() {
    this.logger.debug('System request: Fetching AI predictive hotspots');
    const hotspots = await this.predictiveDispatchService.getPredictiveHotspots();
    this.server.emit('predictiveHotspotsUpdate', hotspots);
    return hotspots;
  }

  @SubscribeMessage('coordinateAccess')
  async handleCoordinateAccess(
    @MessageBody() data: any
  ) {
    const result = CoordinateAccessSchema.safeParse(data);
    if (!result.success) {
      this.logger.error(`Validation failed for coordinateAccess: ${result.error.message}`);
      return { error: 'Invalid data' };
    }

    this.logger.log(`AI Agent initiating access protocol for incident ${data.incidentId} at ${data.address}`);
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
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ) {
    const result = LocationUpdateSchema.safeParse(data);
    if (!result.success) return;

    this.logger.verbose(`Telemetry: Responder ${data.responderId} location updated to ${data.lat}, ${data.lng}`);
    // Update responder location in DB
  }

  @SubscribeMessage('triggerPanic')
  async handleTriggerPanic(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket
  ) {
    const result = PanicTriggerSchema.safeParse(data);
    if (!result.success) {
      this.logger.error(`MALFORMED PANIC SIGNAL from client ${client.id}: ${result.error.message}`);
      return { status: 'ERROR', message: 'Malformed signal' };
    }

    this.logger.warn(`CRITICAL: Panic signal received from User ${data.userId} at ${data.address}`);

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
