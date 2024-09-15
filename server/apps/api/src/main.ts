import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const appName = process.env.APP_NAME;
  const port = process.env.PORT;

  const documentConfig = new DocumentBuilder()
    .setTitle(`${appName} Service`)
    .setDescription(`${appName} Service API description`)
    .setVersion('1.0')
    .addTag(appName)
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  console.log(`${appName} is running on ${port}`);
}
bootstrap();
