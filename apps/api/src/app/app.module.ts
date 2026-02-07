import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DispatchService } from './dispatch/dispatch.service';
import { DispatchGateway } from './dispatch/dispatch.gateway';
import { PrismaService } from '@instant-guard/database';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DispatchService, DispatchGateway, PrismaService],
})
export class AppModule {}
