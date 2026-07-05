import { Test, TestingModule } from '@nestjs/testing';
import { AgregacionServicio } from '../services/agregacion.service';
import { AgregacionControlador } from './agregacion.controller';

describe('AgregacionControlador', () => {
  let controlador: AgregacionControlador;
  let servicio: jest.Mocked<AgregacionServicio>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [AgregacionControlador],
      providers: [
        {
          provide: AgregacionServicio,
          useValue: { obtenerProyectoCompleto: jest.fn() },
        },
      ],
    }).compile();

    controlador = modulo.get(AgregacionControlador);
    servicio = modulo.get(AgregacionServicio);
  });

  it('debe delegar obtenerProyectoCompleto sin token', async () => {
    servicio.obtenerProyectoCompleto.mockResolvedValue({
      id: 1,
      imagenes: [],
      tipologias: [],
      equipamiento: {},
    } as never);

    const resultado = await controlador.obtenerProyectoCompleto(1, undefined);

    expect(servicio.obtenerProyectoCompleto).toHaveBeenCalledWith(1, undefined);
    expect(resultado).toMatchObject({ id: 1 });
  });

  it('debe delegar obtenerProyectoCompleto con token', async () => {
    servicio.obtenerProyectoCompleto.mockResolvedValue({
      id: 2,
      imagenes: [],
      tipologias: [],
      equipamiento: {},
    } as never);

    await controlador.obtenerProyectoCompleto(2, 'Bearer tok');

    expect(servicio.obtenerProyectoCompleto).toHaveBeenCalledWith(2, 'Bearer tok');
  });
});
