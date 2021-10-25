import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Metamorphosa')
      .setDescription('This REST API docs Metamorphosa')
      .setVersion('1.0.0')
      .build(),
  );
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(7000);
}

bootstrap();
