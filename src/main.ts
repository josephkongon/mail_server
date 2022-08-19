import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin',
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.enableCors();
  app.setGlobalPrefix('api');

  const option = new DocumentBuilder()
    .setTitle('Message API')
    .setDescription('Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(5000);
}
bootstrap();
