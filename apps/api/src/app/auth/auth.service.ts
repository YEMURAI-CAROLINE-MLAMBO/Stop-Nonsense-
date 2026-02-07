import { Injectable } from '@nestjs/common';
import { PrismaService } from '@instant-guard/database';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: { phone: string; name: string }) {
    return this.prisma.user.upsert({
      where: { phone: data.phone },
      update: { name: data.name },
      create: { phone: data.phone, name: data.name },
    });
  }

  async registerResponder(data: { phone: string; name: string }) {
    return this.prisma.responder.upsert({
      where: { phone: data.phone },
      update: { name: data.name },
      create: { phone: data.phone, name: data.name },
    });
  }

  async login(phone: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (user) return { type: 'user', profile: user };

    const responder = await this.prisma.responder.findUnique({ where: { phone } });
    if (responder) return { type: 'responder', profile: responder };

    throw new Error('User not found');
  }
}
