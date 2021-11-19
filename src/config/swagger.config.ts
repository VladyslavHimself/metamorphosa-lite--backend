import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Metamorphosa')
  .setDescription('This REST API docs Metamorphosa')
  .setVersion('1.1.2')
  .addBearerAuth()
  .build();

export default swaggerConfig;
