import { Injectable } from '@nestjs/common';
import { PrismaService, PaymentStatus } from '@instant-guard/database';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async processIncidentPayment(incidentId: string, amount: number) {
    const incident = await this.prisma.incident.findUnique({
      where: { id: incidentId },
    });

    if (!incident) throw new Error('Incident not found');

    // In a real app, this would integrate with Paystack/Yoco
    console.log(`Processing payment of R${amount} for incident ${incidentId}`);

    // Simulate successful payment
    const updatedIncident = await this.prisma.incident.update({
      where: { id: incidentId },
      data: {
        paymentStatus: PaymentStatus.PAID,
        amount,
      },
    });

    // Check if user has any other unpaid incidents
    const unpaidIncidents = await this.prisma.incident.count({
      where: {
        userId: incident.userId,
        paymentStatus: { not: PaymentStatus.PAID },
      },
    });

    if (unpaidIncidents === 0) {
      await this.prisma.user.update({
        where: { id: incident.userId },
        data: { isRestricted: false },
      });
    }

    return updatedIncident;
  }

  async checkUserRestriction(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const unpaidIncidents = await this.prisma.incident.count({
      where: {
        userId,
        paymentStatus: { not: PaymentStatus.PAID },
      },
    });

    if (unpaidIncidents > 0 && !user.isRestricted) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { isRestricted: true },
      });
      return true;
    }

    return user.isRestricted;
  }
}
