/**
 * Archivo: app.module.ts
 * Ubicación: src
 * Tipo: Módulo raíz del BFF
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import microservicesConfig from './config/microservices.config';
import { FiltroExcepcionesHttp } from './common/filters/filtro-excepciones-http.filter';
import { ProxyModule } from './proxy/proxy.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { SolicitudesInteresModule } from './modules/solicitudes-interes/solicitudes-interes.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProjectImagesModule } from './modules/project-images/project-images.module';
import { TypologiesModule } from './modules/typologies/typologies.module';
import { TypologyImagesModule } from './modules/typology-images/typology-images.module';
import { ProjectAmenitiesModule } from './modules/project-amenities/project-amenities.module';
import { AgregacionModule } from './modules/agregacion/agregacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [microservicesConfig],
    }),
    ProxyModule,
    UsersModule,
    AuthModule,
    RolesModule,
    SolicitudesInteresModule,
    FavoritosModule,
    ProjectsModule,
    ProjectImagesModule,
    TypologiesModule,
    TypologyImagesModule,
    ProjectAmenitiesModule,
    AgregacionModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroExcepcionesHttp,
    },
  ],
})
export class AppModule {}
