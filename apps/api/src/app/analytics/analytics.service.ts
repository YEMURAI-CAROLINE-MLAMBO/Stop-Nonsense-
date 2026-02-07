import { Injectable } from '@nestjs/common';
import { PrismaService } from '@instant-guard/database';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getIncidentHeatmap() {
    // Return coordinates and density of incidents for the map
    return this.prisma.incident.findMany({
      select: {
        lat: true,
        lng: true,
      },
    });
  }

  async getPerformanceMetrics() {
    const totalIncidents = await this.prisma.incident.count();
    const resolvedIncidents = await this.prisma.incident.findMany({
      where: { status: 'RESOLVED' },
      select: { createdAt: true, resolvedAt: true },
    });

    const avgResponseTime = resolvedIncidents.reduce((acc, curr) => {
      const diff = curr.resolvedAt.getTime() - curr.createdAt.getTime();
      return acc + diff;
    }, 0) / (resolvedIncidents.length || 1);

    return {
      totalIncidents,
      avgResponseTimeMs: avgResponseTime,
      resolvedCount: resolvedIncidents.length,
    };
  }
}
