import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Hello',
  })
  getHello(): string {
    return this.authService.getHello();
  }

  // @UseGuards(JwtGuard)
  @Get('private')
  privateEndpoint(@Req() request: Request): string {
    return this.authService.getPrivateMessage(request);
  }
}
