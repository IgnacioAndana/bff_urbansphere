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
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { PropertyImagesModule } from './modules/property-images/property-images.module';
import { PropertyFeaturesModule } from './modules/property-features/property-features.module';
import { VirtualToursModule } from './modules/virtual-tours/virtual-tours.module';
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
    PermissionsModule,
    ProjectsModule,
    PropertiesModule,
    PropertyImagesModule,
    PropertyFeaturesModule,
    VirtualToursModule,
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
