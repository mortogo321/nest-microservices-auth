import { hash, PrismaService, User } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  getHello(): string {
    return 'Hello from Auth!';
  }

  async signUp(body: AuthDto) {
    const { email, password } = body;
    const isUser = plainToInstance(
      User,
      await this.db.user.findFirst({ where: { email } }),
    );

    if (isUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hash(password);
    const user = plainToInstance(
      User,
      await this.db.user.create({
        data: {
          email,
          hashedPassword,
        },
      }),
    );

    return user;
  }

  async signIn() {}

  signOut(res: Request) {
    return res.body;
  }
}
