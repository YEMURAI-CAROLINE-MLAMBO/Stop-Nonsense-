import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispatchService } from './dispatch/dispatch.service';
import { DispatchGateway } from './dispatch/dispatch.gateway';
import { PrismaService } from '@instant-guard/database';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { SupportService } from './support/support.service';
import { SupportController } from './support/support.controller';
import { InfrastructureService } from './infrastructure/infrastructure.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, SupportController],
  providers: [
    AppService,
    DispatchService,
    DispatchGateway,
    PrismaService,
    AuthService,
    SupportService,
    InfrastructureService,
  ],
})
export class AppModule {}
