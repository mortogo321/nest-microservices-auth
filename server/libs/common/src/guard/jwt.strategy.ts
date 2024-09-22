import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    const cookiesName = process.env.JWT_COOKIES;

    if (
      req.cookies &&
      cookiesName in req.cookies &&
      req.cookies[cookiesName].length > 0
    ) {
      return req.cookies[cookiesName];
    }

    return null;
  }

  async validate(payload: any) {
    return { userId: payload.id };
  }
}
