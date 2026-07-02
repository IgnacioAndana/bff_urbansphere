/**
 * Archivo: cliente-usuarios.service.ts
 * Ubicación: proxy
 * Tipo: Cliente HTTP hacia MS Usuarios
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';
import { ClienteHttpProxyServicio } from './cliente-http-proxy.service';

@Injectable()
export class ClienteUsuariosServicio {
  constructor(
    private readonly proxy: ClienteHttpProxyServicio,
    private readonly configServicio: ConfigService,
  ) {}

  private get urlBase(): string {
    return this.configServicio.get<string>('microservices.usuariosUrl')!;
  }

  solicitar<T>(
    metodo: Method,
    ruta: string,
    opciones?: {
      cuerpo?: unknown;
      token?: string;
      params?: Record<string, string | number | undefined>;
    },
  ): Promise<T> {
    return this.proxy.solicitar<T>({
      baseUrl: this.urlBase,
      metodo,
      ruta: ruta.startsWith('/') ? ruta : `/${ruta}`,
      cuerpo: opciones?.cuerpo,
      token: opciones?.token,
      params: opciones?.params,
    });
  }
}
