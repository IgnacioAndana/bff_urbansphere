import { Request } from 'express';

export function esMultipart(peticion: Request): boolean {
  const tipo = peticion.headers['content-type'] ?? '';
  return tipo.includes('multipart/form-data');
}
