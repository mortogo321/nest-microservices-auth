import { JwtGuard } from '@app/common';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(JwtGuard)
  @Get('private')
  privateEndpoint(@Req() request: Request): string {
    return this.authService.getPrivateMessage(request);
  }
}
