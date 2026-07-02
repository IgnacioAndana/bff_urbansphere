import { Injectable } from '@nestjs/common';
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

  listarSolicitudes(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/solicitudes-contacto', { token });
  }
}
