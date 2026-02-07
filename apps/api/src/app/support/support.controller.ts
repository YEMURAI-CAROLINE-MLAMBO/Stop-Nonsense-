import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('tickets')
  createTicket(@Body() data: { userId: string; subject: string; message: string }) {
    return this.supportService.createTicket(data.userId, data.subject, data.message);
  }

  @Get('tickets')
  getTickets(@Query('userId') userId: string) {
    return this.supportService.getTickets(userId);
  }
}
