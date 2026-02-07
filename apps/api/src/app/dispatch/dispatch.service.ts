import { Injectable } from '@nestjs/common';
import { PrismaService } from '@instant-guard/database';
import { IncidentStatus } from '@instant-guard/types';

@Injectable()
export class DispatchService {
  constructor(private prisma: PrismaService) {}

  async findNearestResponders(lat: number, lng: number, radiusKm: number) {
    // PostGIS query to find responders within radius
    // We use raw SQL for spatial queries with Prisma
    return this.prisma.$queryRaw`
      SELECT id, name, phone, "currentLat", "currentLng"
      FROM responders
      WHERE "isOnline" = true
      AND ST_DWithin(
        ST_MakePoint("currentLng", "currentLat")::geography,
        ST_MakePoint(${lng}, ${lat})::geography,
        ${radiusKm * 1000}
      )
      ORDER BY ST_Distance(
        ST_MakePoint("currentLng", "currentLat")::geography,
        ST_MakePoint(${lng}, ${lat})::geography
      )
      LIMIT 3
    `;
  }

  async updateResponderLocation(responderId: string, lat: number, lng: number) {
    return this.prisma.responder.update({
      where: { id: responderId },
      data: { currentLat: lat, currentLng: lng },
    });
  }

  async updateResponderStatus(responderId: string, isOnline: boolean) {
    return this.prisma.responder.update({
      where: { id: responderId },
      data: { isOnline },
    });
  }

  async createIncident(userId: string, lat: number, lng: number, address: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    return this.prisma.incident.create({
      data: {
        userId,
        lat,
        lng,
        address,
        accessMethod: user.accessMethod || 'OPEN_STREET',
        accessContacts: user.accessContacts,
        status: IncidentStatus.DISPATCHING,
      },
    });
  }

  async acceptIncident(incidentId: string, responderId: string) {
    // Transaction to ensure first-to-accept
    return this.prisma.$transaction(async (tx) => {
      const incident = await tx.incident.findUnique({
        where: { id: incidentId },
      });

      if (incident.status !== IncidentStatus.DISPATCHING) {
        throw new Error('Incident already accepted or cancelled');
      }

      return tx.incident.update({
        where: { id: incidentId },
        data: {
          responderId,
          status: IncidentStatus.EN_ROUTE,
        },
      });
    });
  }

  async updateIncidentStatus(incidentId: string, status: IncidentStatus) {
    return this.prisma.incident.update({
      where: { id: incidentId },
      data: {
        status,
        resolvedAt: status === IncidentStatus.RESOLVED ? new Date() : undefined,
      },
    });
  }

  async getIncidentHistory(userId: string) {
    return this.prisma.incident.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { responder: true },
    });
  }
}
