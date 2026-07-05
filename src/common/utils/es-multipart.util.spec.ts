import { Request } from 'express';
import { esMultipart } from './es-multipart.util';

describe('esMultipart', () => {
  it('debe detectar multipart/form-data', () => {
    const peticion = {
      headers: { 'content-type': 'multipart/form-data; boundary=----abc' },
    } as Request;

    expect(esMultipart(peticion)).toBe(true);
  });

  it('debe retornar false para application/json', () => {
    const peticion = {
      headers: { 'content-type': 'application/json' },
    } as Request;

    expect(esMultipart(peticion)).toBe(false);
  });

  it('debe retornar false si no hay content-type', () => {
    const peticion = { headers: {} } as Request;

    expect(esMultipart(peticion)).toBe(false);
  });
});
