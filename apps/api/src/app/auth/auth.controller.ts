import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user')
  registerUser(@Body() data: { phone: string; name: string }) {
    return this.authService.registerUser(data);
  }

  @Post('register/responder')
  registerResponder(@Body() data: { phone: string; name: string }) {
    return this.authService.registerResponder(data);
  }

  @Post('login')
  login(@Body() data: { phone: string }) {
    return this.authService.login(data.phone);
  }
}
