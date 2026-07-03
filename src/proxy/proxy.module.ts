/**
 * Archivo: proxy.module.ts
 * Ubicación: proxy
 * Tipo: Módulo global de clientes HTTP
 */

import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ClienteHttpProxyServicio } from './cliente-http-proxy.service';
import { ClienteProyectosServicio } from './cliente-proyectos.service';
import { ClienteUsuariosServicio } from './cliente-usuarios.service';

const LIMITE_SUBIDA = 10 * 1024 * 1024;

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 60000,
      maxRedirects: 3,
      maxBodyLength: LIMITE_SUBIDA,
      maxContentLength: LIMITE_SUBIDA,
    }),
  ],
  providers: [
    ClienteHttpProxyServicio,
    ClienteUsuariosServicio,
    ClienteProyectosServicio,
  ],
  exports: [ClienteUsuariosServicio, ClienteProyectosServicio],
})
export class ProxyModule {}
