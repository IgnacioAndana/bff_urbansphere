import { Injectable } from '@nestjs/common';
import { ActualizarGestionSolicitudDto } from '../../../common/dto/actualizar-gestion-solicitud.dto';
import { FiltrarSolicitudesQueryDto } from '../../../common/dto/filtrar-solicitudes-query.dto';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { CrearSolicitudContactoDto } from '../dto/crear-solicitud-contacto.dto';

@Injectable()
export class SolicitudesContactoProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  crearSolicitud(dto: CrearSolicitudContactoDto) {
    return this.clienteUsuarios.solicitar('POST', '/solicitudes-contacto', {
      cuerpo: dto,
    });
  }

  listarSolicitudes(token: string, filtro?: FiltrarSolicitudesQueryDto) {
    return this.clienteUsuarios.solicitar('GET', '/solicitudes-contacto', {
      token,
      params: filtro?.estado ? { estado: filtro.estado } : undefined,
    });
  }

  actualizarGestion(id: number, dto: ActualizarGestionSolicitudDto, token: string) {
    return this.clienteUsuarios.solicitar('PATCH', `/solicitudes-contacto/${id}/gestion`, {
      cuerpo: dto,
      token,
    });
  }
}
