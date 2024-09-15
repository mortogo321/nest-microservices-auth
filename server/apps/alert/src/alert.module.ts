import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/alert/.env.app`,
    }),
    RmqModule.register({ name: process.env.ALERT_QUEUE }),
    EmailModule,
    SmsModule,
  ],
  controllers: [AlertController],
  providers: [AlertService],
})
export class AlertModule {}
