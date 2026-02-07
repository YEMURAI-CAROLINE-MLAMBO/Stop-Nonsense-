import { Injectable } from '@nestjs/common';
import { PrismaService } from '@instant-guard/database';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async createTicket(userId: string, subject: string, message: string) {
    return this.prisma.supportTicket.create({
      data: {
        userId,
        subject,
        message,
      },
    });
  }

  async getTickets(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
