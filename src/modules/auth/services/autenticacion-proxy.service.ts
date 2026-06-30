import { Injectable } from '@nestjs/common';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { IniciarSesionDto, RefrescarTokenDto } from '../dto/iniciar-sesion.dto';

@Injectable()
export class AutenticacionProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  iniciarSesion(dto: IniciarSesionDto) {
    return this.clienteUsuarios.solicitar('POST', '/autenticacion/iniciar-sesion', {
      cuerpo: dto,
    });
  }

  refrescarToken(dto: RefrescarTokenDto) {
    return this.clienteUsuarios.solicitar('POST', '/autenticacion/refrescar', {
      cuerpo: dto,
    });
  }

  cerrarSesion(dto: RefrescarTokenDto) {
    return this.clienteUsuarios.solicitar('POST', '/autenticacion/cerrar-sesion', {
      cuerpo: dto,
    });
  }

  obtenerPerfil(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/autenticacion/perfil', { token });
  }
}
