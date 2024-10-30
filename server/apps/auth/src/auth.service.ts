import { hash, PrismaService, User, verifyHash } from '@app/common';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello from Auth!';
  }

  async signUp(body: AuthDto) {
    const { email, password } = body;
    const isUser = await this.db.user.findFirst({ where: { email } });

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

  async signIn(body: AuthDto) {
    const { email, password } = body;
    const user = await this.db.user.findFirst({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    if (!(await verifyHash(user.hashedPassword, password))) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  signOut(res: Request) {
    return res.body;
  }
}
