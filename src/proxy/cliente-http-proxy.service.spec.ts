import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosError } from 'axios';
import { Request } from 'express';
import { of, throwError } from 'rxjs';

jest.mock('form-data', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    append: jest.fn(),
    getHeaders: jest.fn().mockReturnValue({ 'content-type': 'multipart/form-data' }),
  })),
}));

import { ClienteHttpProxyServicio } from './cliente-http-proxy.service';

describe('ClienteHttpProxyServicio', () => {
  let servicio: ClienteHttpProxyServicio;
  let httpService: { request: jest.Mock };

  beforeEach(async () => {
    httpService = { request: jest.fn() };

    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteHttpProxyServicio,
        { provide: HttpService, useValue: httpService },
      ],
    }).compile();

    servicio = modulo.get(ClienteHttpProxyServicio);
  });

  describe('solicitar', () => {
    it('debe reenviar petición GET sin Authorization si no hay token', async () => {
      httpService.request.mockReturnValue(of({ status: 200, data: [{ id: 1 }] }));

      const resultado = await servicio.solicitar<{ id: number }[]>({
        baseUrl: 'http://localhost:3002/',
        metodo: 'GET',
        ruta: '/proyectos',
      });

      expect(resultado).toEqual([{ id: 1 }]);
      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3002/proyectos',
          headers: {},
        }),
      );
    });

    it('debe normalizar token con prefijo Bearer', async () => {
      httpService.request.mockReturnValue(of({ status: 200, data: {} }));

      await servicio.solicitar({
        baseUrl: 'http://localhost:3002',
        metodo: 'GET',
        ruta: '/proyectos/1',
        token: 'mi-token',
      });

      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: 'Bearer mi-token' },
        }),
      );
    });

    it('debe conservar token que ya incluye Bearer', async () => {
      httpService.request.mockReturnValue(of({ status: 200, data: {} }));

      await servicio.solicitar({
        baseUrl: 'http://localhost:3002',
        metodo: 'GET',
        ruta: '/proyectos',
        token: 'Bearer abc123',
      });

      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: { Authorization: 'Bearer abc123' },
        }),
      );
    });

    it('debe propagar HttpException con mensaje del MS (campo mensaje)', async () => {
      httpService.request.mockReturnValue(
        of({
          status: 404,
          data: { mensaje: 'Proyecto no encontrado' },
          statusText: 'Not Found',
        }),
      );

      await expect(
        servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'GET',
          ruta: '/proyectos/99',
        }),
      ).rejects.toMatchObject({
        response: 'Proyecto no encontrado',
        status: 404,
      });
    });

    it('debe propagar HttpException con mensaje del MS (campo message)', async () => {
      httpService.request.mockReturnValue(
        of({
          status: 400,
          data: { message: 'Datos inválidos' },
          statusText: 'Bad Request',
        }),
      );

      try {
        await servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'POST',
          ruta: '/proyectos',
          cuerpo: {},
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect((error as HttpException).getStatus()).toBe(400);
        expect((error as HttpException).getResponse()).toBe('Datos inválidos');
      }
    });

    it('debe usar statusText si el cuerpo de error no tiene mensaje', async () => {
      httpService.request.mockReturnValue(
        of({ status: 500, data: null, statusText: 'Internal Server Error' }),
      );

      await expect(
        servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'GET',
          ruta: '/proyectos',
        }),
      ).rejects.toMatchObject({
        response: 'Internal Server Error',
        status: 500,
      });
    });

    it('debe responder 502 ante error de red de Axios', async () => {
      const errorRed = { message: 'Network Error' } as AxiosError;
      httpService.request.mockReturnValue(throwError(() => errorRed));

      await expect(
        servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'GET',
          ruta: '/proyectos',
        }),
      ).rejects.toMatchObject({
        response: 'Error al comunicarse con el microservicio',
        status: 502,
      });
    });

    it('debe propagar cuerpo de error como objeto si no tiene mensaje', async () => {
      const cuerpoError = { codigo: 'VALIDATION', detalles: ['campo requerido'] };
      httpService.request.mockReturnValue(
        of({ status: 422, data: cuerpoError, statusText: 'Unprocessable Entity' }),
      );

      try {
        await servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'POST',
          ruta: '/proyectos',
          cuerpo: {},
        });
      } catch (error) {
        expect((error as HttpException).getResponse()).toEqual(cuerpoError);
      }
    });

    it('debe re-lanzar HttpException sin envolver', async () => {
      const excepcion = new HttpException('Ya propagado', 403);
      httpService.request.mockReturnValue(throwError(() => excepcion));

      await expect(
        servicio.solicitar({
          baseUrl: 'http://localhost:3002',
          metodo: 'GET',
          ruta: '/proyectos',
        }),
      ).rejects.toBe(excepcion);
    });

    it('debe construir FormData cuando hay archivo adjunto', async () => {
      httpService.request.mockReturnValue(of({ status: 201, data: { id: 1 } }));

      const archivo = {
        buffer: Buffer.from('fake'),
        originalname: 'foto.jpg',
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      await servicio.solicitar({
        baseUrl: 'http://localhost:3002',
        metodo: 'POST',
        ruta: '/proyectos/1/imagenes',
        token: 'Bearer tok',
        cuerpo: { esPortada: true },
        archivo,
      });

      const llamada = httpService.request.mock.calls[0][0];
      expect(llamada.data).toBeDefined();
      expect(typeof llamada.data.getHeaders).toBe('function');
    });
  });

  describe('reenviarMultipart', () => {
    it('debe reenviar Content-Type y Authorization del request original', async () => {
      httpService.request.mockReturnValue(of({ status: 201, data: { id: 5 } }));

      const peticion = {
        headers: {
          'content-type': 'multipart/form-data; boundary=abc',
          'content-length': '1024',
        },
      } as Request;

      await servicio.reenviarMultipart({
        baseUrl: 'http://localhost:3002',
        metodo: 'POST',
        ruta: '/proyectos/1/imagenes',
        peticion,
        token: 'tok',
      });

      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data; boundary=abc',
            'Content-Length': '1024',
            Authorization: 'Bearer tok',
          },
          data: peticion,
        }),
      );
    });

    it('debe propagar error 4xx en multipart igual que en solicitar', async () => {
      httpService.request.mockReturnValue(
        of({
          status: 413,
          data: { mensaje: 'Archivo demasiado grande' },
          statusText: 'Payload Too Large',
        }),
      );

      await expect(
        servicio.reenviarMultipart({
          baseUrl: 'http://localhost:3002',
          metodo: 'POST',
          ruta: '/proyectos/1/imagenes',
          peticion: { headers: {} } as Request,
        }),
      ).rejects.toMatchObject({
        status: 413,
        response: 'Archivo demasiado grande',
      });
    });
    it('debe leer headers content-type como array en multipart', async () => {
      httpService.request.mockReturnValue(of({ status: 200, data: {} }));

      const peticion = {
        headers: {
          'content-type': ['multipart/form-data; boundary=x', 'ignored'],
          'content-length': ['512'],
        },
      } as unknown as Request;

      await servicio.reenviarMultipart({
        baseUrl: 'http://localhost:3002',
        metodo: 'PATCH',
        ruta: '/proyectos/1/imagenes/2',
        peticion,
      });

      expect(httpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: {
            'Content-Type': 'multipart/form-data; boundary=x',
            'Content-Length': '512',
          },
        }),
      );
    });
  });
});
