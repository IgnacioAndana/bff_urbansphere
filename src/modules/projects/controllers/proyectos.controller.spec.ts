import { Test, TestingModule } from '@nestjs/testing';
import { TipoProyecto } from '../../../common/enums/tipo-proyecto.enum';
import { ProyectosControlador } from './proyectos.controller';
import { ProyectosProxyServicio } from '../services/proyectos-proxy.service';

describe('ProyectosControlador', () => {
  let controlador: ProyectosControlador;
  let proxy: jest.Mocked<ProyectosProxyServicio>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [ProyectosControlador],
      providers: [
        {
          provide: ProyectosProxyServicio,
          useValue: {
            crearProyecto: jest.fn(),
            listarProyectos: jest.fn(),
            consultarCatalogo: jest.fn(),
            buscarProyectoPorId: jest.fn(),
            actualizarProyecto: jest.fn(),
            eliminarProyecto: jest.fn(),
          },
        },
      ],
    }).compile();

    controlador = modulo.get(ProyectosControlador);
    proxy = modulo.get(ProyectosProxyServicio);
  });

  it('debe listar proyectos sin token (público)', async () => {
    proxy.listarProyectos.mockResolvedValue([{ id: 1 }]);

    const resultado = await controlador.listarProyectos(undefined);

    expect(proxy.listarProyectos).toHaveBeenCalledWith(undefined);
    expect(resultado).toEqual([{ id: 1 }]);
  });

  it('debe consultar catálogo sin token', async () => {
    proxy.consultarCatalogo.mockResolvedValue({ items: [], omitidos: [] });

    await controlador.consultarCatalogo({ ids: [1, 2] }, undefined);

    expect(proxy.consultarCatalogo).toHaveBeenCalledWith([1, 2], undefined);
  });

  it('debe buscar proyecto por id con token opcional', async () => {
    proxy.buscarProyectoPorId.mockResolvedValue({ id: 5, titulo: 'Demo' });

    await controlador.buscarProyectoPorId(5, 'Bearer tok');

    expect(proxy.buscarProyectoPorId).toHaveBeenCalledWith(5, 'Bearer tok');
  });

  it('debe crear proyecto reenviando token', async () => {
    proxy.crearProyecto.mockResolvedValue({ id: 1 });
    const dto = {
      titulo: 'Nuevo',
      direccion: 'Calle 1',
      comuna: 'Santiago',
      tipo: TipoProyecto.DEPARTAMENTO,
    };

    await controlador.crearProyecto(dto, 'Bearer admin');

    expect(proxy.crearProyecto).toHaveBeenCalledWith(dto, 'Bearer admin');
  });

  it('debe actualizar y eliminar proyecto con token', async () => {
    proxy.actualizarProyecto.mockResolvedValue({ id: 1, titulo: 'Editado' });
    proxy.eliminarProyecto.mockResolvedValue(undefined);

    await controlador.actualizarProyecto(1, { titulo: 'Editado' }, 'Bearer admin');
    await controlador.eliminarProyecto(1, 'Bearer admin');

    expect(proxy.actualizarProyecto).toHaveBeenCalledWith(
      1,
      { titulo: 'Editado' },
      'Bearer admin',
    );
    expect(proxy.eliminarProyecto).toHaveBeenCalledWith(1, 'Bearer admin');
  });
});
