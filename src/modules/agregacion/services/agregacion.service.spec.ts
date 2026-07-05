import { Test, TestingModule } from '@nestjs/testing';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ProyectosProxyServicio } from '../../projects/services/proyectos-proxy.service';
import { AgregacionServicio } from './agregacion.service';

describe('AgregacionServicio', () => {
  let servicio: AgregacionServicio;
  let proyectosProxy: jest.Mocked<ProyectosProxyServicio>;
  let clienteProyectos: jest.Mocked<ClienteProyectosServicio>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        AgregacionServicio,
        {
          provide: ProyectosProxyServicio,
          useValue: { buscarProyectoPorId: jest.fn() },
        },
        {
          provide: ClienteProyectosServicio,
          useValue: { solicitar: jest.fn() },
        },
      ],
    }).compile();

    servicio = modulo.get(AgregacionServicio);
    proyectosProxy = modulo.get(ProyectosProxyServicio);
    clienteProyectos = modulo.get(ClienteProyectosServicio);
  });

  it('debe combinar proyecto, imágenes, tipologías con imágenes y equipamiento', async () => {
    proyectosProxy.buscarProyectoPorId.mockResolvedValue({ id: 1, titulo: 'Torre Norte' });
    clienteProyectos.solicitar
      .mockResolvedValueOnce([{ id: 100, urlS3: 'portada.jpg' }])
      .mockResolvedValueOnce([{ id: 10, codigoTipologia: '2D2B' }, { id: 11, codigoTipologia: '3D2B' }])
      .mockResolvedValueOnce({ gimnasio: true, piscina: false })
      .mockResolvedValueOnce([{ id: 201, urlS3: 'planta-10.jpg' }])
      .mockResolvedValueOnce([{ id: 202, urlS3: 'planta-11.jpg' }]);

    const resultado = await servicio.obtenerProyectoCompleto(1);

    expect(proyectosProxy.buscarProyectoPorId).toHaveBeenCalledWith(1, undefined);
    expect(clienteProyectos.solicitar).toHaveBeenCalledWith('GET', '/proyectos/1/imagenes', {
      token: undefined,
    });
    expect(resultado).toMatchObject({
      id: 1,
      titulo: 'Torre Norte',
      imagenes: [{ id: 100, urlS3: 'portada.jpg' }],
      equipamiento: { gimnasio: true, piscina: false },
    });
    expect(resultado.tipologias).toHaveLength(2);
    expect(resultado.tipologias[0]).toMatchObject({
      id: 10,
      imagenes: [{ id: 201, urlS3: 'planta-10.jpg' }],
    });
    expect(resultado.tipologias[1]).toMatchObject({
      id: 11,
      imagenes: [{ id: 202, urlS3: 'planta-11.jpg' }],
    });
  });

  it('debe propagar token a todas las llamadas al MS Proyectos', async () => {
    proyectosProxy.buscarProyectoPorId.mockResolvedValue({ id: 2, titulo: 'Edificio Sur' });
    clienteProyectos.solicitar
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: 20 }])
      .mockResolvedValueOnce({})
      .mockResolvedValueOnce([]);

    await servicio.obtenerProyectoCompleto(2, 'Bearer admin-token');

    expect(proyectosProxy.buscarProyectoPorId).toHaveBeenCalledWith(2, 'Bearer admin-token');
    expect(clienteProyectos.solicitar).toHaveBeenCalledWith('GET', '/proyectos/2/imagenes', {
      token: 'Bearer admin-token',
    });
    expect(clienteProyectos.solicitar).toHaveBeenCalledWith(
      'GET',
      '/proyectos/2/tipologias/20/imagenes',
      { token: 'Bearer admin-token' },
    );
  });

  it('debe propagar error si el proyecto no existe', async () => {
    proyectosProxy.buscarProyectoPorId.mockRejectedValue(new Error('404'));

    await expect(servicio.obtenerProyectoCompleto(99)).rejects.toThrow('404');
    expect(clienteProyectos.solicitar).not.toHaveBeenCalled();
  });
});
