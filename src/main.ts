/**
 * Archivo: main.ts
 * Ubicación: src
 * Tipo: Punto de entrada del BFF
 * Contenido: bootstrap NestJS, CORS, prefijo /api, validación global y Swagger
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const origenCors = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: origenCors === '*' ? true : origenCors.split(',').map((o) => o.trim()),
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('UrbanSphere - BFF')
    .setDescription(
      'Backend for Frontend: agrega y expone una API unificada sobre MS Usuarios y MS Proyectos',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documento);

  const puerto = process.env.PORT || 3000;
  await app.listen(puerto);
  console.log(`BFF UrbanSphere en http://localhost:${puerto}`);
  console.log(`Swagger: http://localhost:${puerto}/api/docs`);
}

bootstrap();
