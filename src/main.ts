import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.URL_API);
  app.use(cookieParser());
  app.enableCors();

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Metamorphosa')
      .setDescription('This REST API docs Metamorphosa')
      .setVersion('1.1.2')
      .addBearerAuth()
      .build(),
  );
  SwaggerModule.setup(process.env.URL_API_DOCS, app, document);

  await app.listen(process.env.PORT || 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
