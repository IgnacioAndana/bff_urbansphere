/**
 * Archivo: token-bearer.decorator.ts
 * Ubicación: common/decorators
 * Tipo: Decorador de parámetro
 * Contenido: extrae el header Authorization para reenviarlo a los microservicios
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const TokenBearer = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const peticion = ctx.switchToHttp().getRequest<Request>();
    const autorizacion = peticion.headers.authorization;

    if (!autorizacion) {
      return undefined;
    }

    return autorizacion.startsWith('Bearer ') ? autorizacion : `Bearer ${autorizacion}`;
  },
);
