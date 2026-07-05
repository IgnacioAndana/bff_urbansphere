import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { FiltroExcepcionesHttp } from './filtro-excepciones-http.filter';

describe('FiltroExcepcionesHttp', () => {
  let filtro: FiltroExcepcionesHttp;
  let respuestaJson: jest.Mock;
  let respuestaStatus: jest.Mock;
  let host: ArgumentsHost;

  beforeEach(() => {
    filtro = new FiltroExcepcionesHttp();
    respuestaJson = jest.fn();
    respuestaStatus = jest.fn().mockReturnValue({ json: respuestaJson });

    host = {
      switchToHttp: () => ({
        getResponse: () =>
          ({
            status: respuestaStatus,
            json: respuestaJson,
          }) as unknown as Response,
        getRequest: () =>
          ({
            method: 'GET',
            url: '/proyectos/1',
          }) as Request,
      }),
    } as ArgumentsHost;
  });

  it('debe formatear HttpException con codigoEstado y ruta', () => {
    filtro.catch(new HttpException('Proyecto no encontrado', HttpStatus.NOT_FOUND), host);

    expect(respuestaStatus).toHaveBeenCalledWith(404);
    expect(respuestaJson).toHaveBeenCalledWith(
      expect.objectContaining({
        codigoEstado: 404,
        ruta: '/proyectos/1',
        mensaje: 'Proyecto no encontrado',
        fecha: expect.any(String),
      }),
    );
  });

  it('debe responder 500 ante errores no HTTP', () => {
    filtro.catch(new Error('fallo inesperado'), host);

    expect(respuestaStatus).toHaveBeenCalledWith(500);
    expect(respuestaJson).toHaveBeenCalledWith(
      expect.objectContaining({
        codigoEstado: 500,
        mensaje: 'Error interno del servidor',
      }),
    );
  });
});
