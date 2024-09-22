import { ResponseInterceptor, RmqService } from '@app/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const appName = process.env.APP_NAME;

  const documentConfig = new DocumentBuilder()
    .setTitle(`${appName} Service`)
    .setDescription(`${appName} Service API description`)
    .setVersion('1.0')
    .addTag(appName)
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  const queueName = process.env.AUTH_QUEUE;
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions(queueName, true));
  await app.startAllMicroservices();

  const port = process.env.PORT;
  await app.listen(port);
  console.log(`${appName} is running on ${port}`);
  console.log(`queue name is ${queueName}`);
}
bootstrap();
