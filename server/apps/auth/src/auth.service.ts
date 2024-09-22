import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello from Auth!';
  }

  getPrivateMessage(request: Request): string {
    return String(request.cookies);
  }
}
