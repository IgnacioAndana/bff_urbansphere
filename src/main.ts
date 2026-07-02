/**
 * Archivo: main.ts
 * Ubicación: src
 * Tipo: Punto de entrada del BFF
 * Contenido: bootstrap NestJS, CORS, validación global y Swagger (sin prefijo /api)
 */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const origenCors = process.env.CORS_ORIGIN || '*';
  app.enableCors({
    origin: origenCors === '*' ? true : origenCors.split(',').map((o) => o.trim()),
    credentials: true,
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'BFF Urbansphere running' });
  });

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
  SwaggerModule.setup('docs', app, documento);

  const puerto = process.env.PORT || 3000;
  await app.listen(puerto);
  console.log(`BFF UrbanSphere en http://localhost:${puerto}`);
  console.log(`Swagger: http://localhost:${puerto}/docs`);
}

bootstrap();
