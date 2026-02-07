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
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AnalyticsService } from './analytics/analytics.service';
import { AnalyticsController } from './analytics/analytics.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    SupportController,
    PaymentController,
    AnalyticsController,
  ],
  providers: [
    AppService,
    DispatchService,
    DispatchGateway,
    PrismaService,
    AuthService,
    SupportService,
    InfrastructureService,
    PaymentService,
    AnalyticsService,
  ],
})
export class AppModule {}
