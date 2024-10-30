import { AuthJwtModule, DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/auth/.env.app`,
    }),
    RmqModule.register({ name: process.env.AUTH_QUEUE }),
    DatabaseModule,
    AuthJwtModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
