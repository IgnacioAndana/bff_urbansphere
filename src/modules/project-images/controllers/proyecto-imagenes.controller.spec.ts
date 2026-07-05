import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ProyectoImagenesControlador } from './proyecto-imagenes.controller';

describe('ProyectoImagenesControlador', () => {
  let controlador: ProyectoImagenesControlador;
  let cliente: jest.Mocked<ClienteProyectosServicio>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoImagenesControlador],
      providers: [
        {
          provide: ClienteProyectosServicio,
          useValue: {
            solicitar: jest.fn(),
            reenviarMultipart: jest.fn(),
          },
        },
      ],
    }).compile();

    controlador = modulo.get(ProyectoImagenesControlador);
    cliente = modulo.get(ClienteProyectosServicio);
  });

  it('debe listar imágenes sin token (público)', async () => {
    cliente.solicitar.mockResolvedValue([]);

    await controlador.listarImagenes(1, undefined);

    expect(cliente.solicitar).toHaveBeenCalledWith('GET', '/proyectos/1/imagenes', {
      token: undefined,
    });
  });

  it('debe reenviar multipart tal cual al MS', () => {
    const peticion = {
      headers: { 'content-type': 'multipart/form-data; boundary=x' },
    } as Request;

    controlador.crearImagen(peticion, 3, 'Bearer tok');

    expect(cliente.reenviarMultipart).toHaveBeenCalledWith(
      'POST',
      '/proyectos/3/imagenes',
      peticion,
      'Bearer tok',
    );
    expect(cliente.solicitar).not.toHaveBeenCalled();
  });

  it('debe enviar JSON filtrado cuando no es multipart', () => {
    const peticion = {
      headers: { 'content-type': 'application/json' },
      body: {
        urlS3: 'https://s3/img.jpg',
        etiqueta: 'fachada',
        esPortada: true,
        orden: 0,
        campoExtra: 'ignorado',
      },
    } as Request;

    controlador.crearImagen(peticion, 3, 'Bearer tok');

    expect(cliente.solicitar).toHaveBeenCalledWith('POST', '/proyectos/3/imagenes', {
      cuerpo: {
        urlS3: 'https://s3/img.jpg',
        etiqueta: 'fachada',
        esPortada: true,
        orden: 0,
      },
      token: 'Bearer tok',
    });
    expect(cliente.reenviarMultipart).not.toHaveBeenCalled();
  });

  it('debe actualizar imagen vía multipart o JSON', async () => {
    const peticionMultipart = {
      headers: { 'content-type': 'multipart/form-data' },
    } as Request;

    controlador.actualizarImagen(peticionMultipart, 1, 5, 'Bearer tok');
    expect(cliente.reenviarMultipart).toHaveBeenCalledWith(
      'PATCH',
      '/proyectos/1/imagenes/5',
      peticionMultipart,
      'Bearer tok',
    );

    const peticionJson = {
      headers: { 'content-type': 'application/json' },
      body: { esPortada: false },
    } as Request;

    controlador.actualizarImagen(peticionJson, 1, 5, 'Bearer tok');
    expect(cliente.solicitar).toHaveBeenCalledWith('PATCH', '/proyectos/1/imagenes/5', {
      cuerpo: { esPortada: false },
      token: 'Bearer tok',
    });
  });

  it('debe eliminar imagen con token', async () => {
    cliente.solicitar.mockResolvedValue(undefined);

    await controlador.eliminarImagen(1, 9, 'Bearer tok');

    expect(cliente.solicitar).toHaveBeenCalledWith('DELETE', '/proyectos/1/imagenes/9', {
      token: 'Bearer tok',
    });
  });
});
