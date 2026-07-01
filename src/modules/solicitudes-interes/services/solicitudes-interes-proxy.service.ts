import { Injectable } from '@nestjs/common';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { CrearSolicitudInteresDto } from '../dto/crear-solicitud-interes.dto';

@Injectable()
export class SolicitudesInteresProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  crearSolicitud(dto: CrearSolicitudInteresDto, token?: string) {
    return this.clienteUsuarios.solicitar('POST', '/solicitudes-interes', {
      cuerpo: dto,
      token,
    });
  }

  listarSolicitudes(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/solicitudes-interes', { token });
  }

  listarPorProyecto(proyectoId: number, token: string) {
    return this.clienteUsuarios.solicitar(
      'GET',
      `/solicitudes-interes/proyecto/${proyectoId}`,
      { token },
    );
  }
}
