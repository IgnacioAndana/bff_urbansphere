/**
 * Archivo: cliente-http-proxy.service.ts
 * Ubicación: proxy
 * Tipo: Servicio HTTP
 * Contenido: reenvía peticiones a los microservicios y propaga errores
 */

import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosError, Method } from 'axios';
import FormData from 'form-data';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';

export interface OpcionesProxy {
  baseUrl: string;
  metodo: Method;
  ruta: string;
  cuerpo?: unknown;
  token?: string;
  params?: Record<string, string | number | undefined>;
  archivo?: Express.Multer.File;
}

@Injectable()
export class ClienteHttpProxyServicio {
  private readonly logger = new Logger(ClienteHttpProxyServicio.name);

  constructor(private readonly httpService: HttpService) {}

  /** Reenvía el body multipart tal cual (sin multer ni JSON) hacia el microservicio. */
  async reenviarMultipart<T>(
    opciones: Omit<OpcionesProxy, 'cuerpo' | 'archivo'> & { peticion: Request },
  ): Promise<T> {
    const urlBase = opciones.baseUrl.replace(/\/$/, '');
    const url = `${urlBase}${opciones.ruta}`;
    const headers = this.construirHeadersMultipart(opciones.peticion, opciones.token);

    try {
      const respuesta = await firstValueFrom(
        this.httpService.request<T>({
          method: opciones.metodo,
          url,
          headers,
          data: opciones.peticion,
          params: opciones.params,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          validateStatus: () => true,
        }),
      );

      if (respuesta.status >= 400) {
        throw new HttpException(
          this.extraerMensajeError(respuesta.data) ?? respuesta.statusText,
          respuesta.status,
        );
      }

      return respuesta.data;
    } catch (error) {
      return this.manejarErrorAxios(error, opciones.metodo, url);
    }
  }

  async solicitar<T>(opciones: OpcionesProxy): Promise<T> {
    const urlBase = opciones.baseUrl.replace(/\/$/, '');
    const url = `${urlBase}${opciones.ruta}`;

    const headers: Record<string, string> = {};
    if (opciones.token) {
      headers.Authorization = opciones.token.startsWith('Bearer ')
        ? opciones.token
        : `Bearer ${opciones.token}`;
    }

    let data: unknown = opciones.cuerpo;

    if (opciones.archivo) {
      const formulario = new FormData();
      formulario.append('archivo', opciones.archivo.buffer, {
        filename: opciones.archivo.originalname,
        contentType: opciones.archivo.mimetype,
      });

      if (opciones.cuerpo && typeof opciones.cuerpo === 'object') {
        for (const [clave, valor] of Object.entries(
          opciones.cuerpo as Record<string, unknown>,
        )) {
          if (valor !== undefined && valor !== null) {
            formulario.append(clave, String(valor));
          }
        }
      }

      data = formulario;
      Object.assign(headers, formulario.getHeaders());
    }

    try {
      const respuesta = await firstValueFrom(
        this.httpService.request<T>({
          method: opciones.metodo,
          url,
          headers,
          data,
          params: opciones.params,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          validateStatus: () => true,
        }),
      );

      if (respuesta.status >= 400) {
        throw new HttpException(
          this.extraerMensajeError(respuesta.data) ?? respuesta.statusText,
          respuesta.status,
        );
      }

      return respuesta.data;
    } catch (error) {
      return this.manejarErrorAxios(error, opciones.metodo, url);
    }
  }

  private construirHeadersMultipart(
    peticion: Request,
    token?: string,
  ): Record<string, string> {
    const headers: Record<string, string> = {};

    const tipoContenido = peticion.headers['content-type'];
    if (tipoContenido) {
      headers['Content-Type'] = Array.isArray(tipoContenido)
        ? tipoContenido[0]
        : tipoContenido;
    }

    const longitud = peticion.headers['content-length'];
    if (longitud) {
      headers['Content-Length'] = Array.isArray(longitud) ? longitud[0] : longitud;
    }

    if (token) {
      headers.Authorization = token.startsWith('Bearer ')
        ? token
        : `Bearer ${token}`;
    }

    return headers;
  }

  private manejarErrorAxios(error: unknown, metodo: Method, url: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const axiosError = error as AxiosError;
    this.logger.error(`Error proxy ${metodo} ${url}: ${axiosError.message}`);

    throw new HttpException(
      this.extraerMensajeError(axiosError.response?.data) ??
        'Error al comunicarse con el microservicio',
      axiosError.response?.status ?? 502,
    );
  }

  private extraerMensajeError(data: unknown): string | object | undefined {
    if (data === null || data === undefined) {
      return undefined;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (typeof data === 'object') {
      const cuerpo = data as Record<string, unknown>;

      if (typeof cuerpo.mensaje === 'string') {
        return cuerpo.mensaje;
      }

      if (typeof cuerpo.message === 'string') {
        return cuerpo.message;
      }
    }

    return data as object;
  }
}
