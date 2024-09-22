import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  getHello(): string {
    return 'Hello from Auth!';
  }

  async signUp(body: AuthDto) {
    const { email, password } = body;
    console.log({ email, password });
    return '';
  }

  async signIn() {}

  signOut(res: Request) {
    return res.body;
  }
}
