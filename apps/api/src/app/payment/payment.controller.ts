import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  processPayment(@Body() data: { incidentId: string; amount: number }) {
    return this.paymentService.processIncidentPayment(data.incidentId, data.amount);
  }

  @Get('status/:userId')
  checkStatus(@Param('userId') userId: string) {
    return this.paymentService.checkUserRestriction(userId);
  }
}
