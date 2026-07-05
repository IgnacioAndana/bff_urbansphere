import { Test, TestingModule } from '@nestjs/testing';
import { EstadoSolicitud } from '../../../common/enums/estado-solicitud.enum';
import { SolicitudesContactoControlador } from './solicitudes-contacto.controller';
import { SolicitudesContactoProxyServicio } from '../services/solicitudes-contacto-proxy.service';

describe('SolicitudesContactoControlador', () => {
  let controlador: SolicitudesContactoControlador;
  let proxy: jest.Mocked<SolicitudesContactoProxyServicio>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudesContactoControlador],
      providers: [
        {
          provide: SolicitudesContactoProxyServicio,
          useValue: {
            crearSolicitud: jest.fn(),
            listarSolicitudes: jest.fn(),
            actualizarGestion: jest.fn(),
          },
        },
      ],
    }).compile();

    controlador = modulo.get(SolicitudesContactoControlador);
    proxy = modulo.get(SolicitudesContactoProxyServicio);
  });

  it('debe crear solicitud de contacto sin token (público)', async () => {
    const dto = {
      nombreCompleto: 'Ana Pérez',
      email: 'ana@test.com',
      mensaje: 'Quiero información sobre el proyecto',
    };
    proxy.crearSolicitud.mockResolvedValue({ id: 1, ...dto, estado: EstadoSolicitud.PENDIENTE });

    const resultado = (await controlador.crearSolicitud(dto)) as { id: number };

    expect(proxy.crearSolicitud).toHaveBeenCalledWith(dto);
    expect(resultado.id).toBe(1);
  });

  it('debe listar solicitudes con token admin', async () => {
    proxy.listarSolicitudes.mockResolvedValue([]);

    await controlador.listarSolicitudes({ estado: EstadoSolicitud.PENDIENTE }, 'Bearer admin');

    expect(proxy.listarSolicitudes).toHaveBeenCalledWith('Bearer admin', {
      estado: EstadoSolicitud.PENDIENTE,
    });
  });

  it('debe actualizar gestión con token', async () => {
    proxy.actualizarGestion.mockResolvedValue({ id: 2, estado: EstadoSolicitud.RESUELTA });

    await controlador.actualizarGestion(
      2,
      { estado: EstadoSolicitud.RESUELTA, observacionAgente: 'Contactado' },
      'Bearer admin',
    );

    expect(proxy.actualizarGestion).toHaveBeenCalledWith(
      2,
      { estado: EstadoSolicitud.RESUELTA, observacionAgente: 'Contactado' },
      'Bearer admin',
    );
  });
});
