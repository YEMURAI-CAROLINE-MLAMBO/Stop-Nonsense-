import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispatchService } from './dispatch/dispatch.service';
import { DispatchGateway } from './dispatch/dispatch.gateway';
import { PredictiveDispatchService } from './dispatch/predictive-dispatch.service';
import { AccessCoordinationService } from './dispatch/access-coordination.service';
import { PrismaService } from '@instant-guard/database';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    DispatchService,
    DispatchGateway,
    PredictiveDispatchService,
    AccessCoordinationService,
    PrismaService,
  ],
})
export class AppModule {}
