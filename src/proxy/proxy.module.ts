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

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 30000,
      maxRedirects: 3,
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
