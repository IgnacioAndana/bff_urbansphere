/**
 * Archivo: cliente-proyectos.service.ts
 * Ubicación: proxy
 * Tipo: Cliente HTTP hacia MS Proyectos
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';
import { ClienteHttpProxyServicio } from './cliente-http-proxy.service';

@Injectable()
export class ClienteProyectosServicio {
  constructor(
    private readonly proxy: ClienteHttpProxyServicio,
    private readonly configServicio: ConfigService,
  ) {}

  private get urlBase(): string {
    return this.configServicio.get<string>('microservices.proyectosUrl')!;
  }

  solicitar<T>(
    metodo: Method,
    ruta: string,
    opciones?: {
      cuerpo?: unknown;
      token?: string;
      params?: Record<string, string | number | undefined>;
      archivo?: Express.Multer.File;
    },
  ): Promise<T> {
    return this.proxy.solicitar<T>({
      baseUrl: this.urlBase,
      metodo,
      ruta: ruta.startsWith('/') ? ruta : `/${ruta}`,
      cuerpo: opciones?.cuerpo,
      token: opciones?.token,
      params: opciones?.params,
      archivo: opciones?.archivo,
    });
  }
}
