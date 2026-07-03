import { Injectable } from '@nestjs/common';
import { ActualizarGestionSolicitudDto } from '../../../common/dto/actualizar-gestion-solicitud.dto';
import { FiltrarSolicitudesQueryDto } from '../../../common/dto/filtrar-solicitudes-query.dto';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { CrearSolicitudInteresDto } from '../dto/crear-solicitud-interes.dto';

@Injectable()
export class SolicitudesInteresProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  crearSolicitud(dto: CrearSolicitudInteresDto, token: string) {
    return this.clienteUsuarios.solicitar('POST', '/solicitudes-interes', {
      cuerpo: dto,
      token,
    });
  }

  listarSolicitudes(token: string, filtro?: FiltrarSolicitudesQueryDto) {
    return this.clienteUsuarios.solicitar('GET', '/solicitudes-interes', {
      token,
      params: filtro?.estado ? { estado: filtro.estado } : undefined,
    });
  }

  listarPorProyecto(
    proyectoId: number,
    token: string,
    filtro?: FiltrarSolicitudesQueryDto,
  ) {
    return this.clienteUsuarios.solicitar(
      'GET',
      `/solicitudes-interes/proyecto/${proyectoId}`,
      {
        token,
        params: filtro?.estado ? { estado: filtro.estado } : undefined,
      },
    );
  }

  actualizarGestion(id: number, dto: ActualizarGestionSolicitudDto, token: string) {
    return this.clienteUsuarios.solicitar('PATCH', `/solicitudes-interes/${id}/gestion`, {
      cuerpo: dto,
      token,
    });
  }
}
