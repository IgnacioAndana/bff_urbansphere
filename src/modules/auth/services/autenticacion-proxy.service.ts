import { Injectable } from '@nestjs/common';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { IniciarSesionDto, RefrescarTokenDto } from '../dto/iniciar-sesion.dto';
import {
  RestablecerContrasenaDto,
  SolicitarRestablecimientoDto,
  ValidarTokenRestablecimientoDto,
} from '../dto/restablecer-contrasena.dto';

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

  solicitarRestablecimiento(dto: SolicitarRestablecimientoDto) {
    return this.clienteUsuarios.solicitar(
      'POST',
      '/autenticacion/solicitar-restablecimiento',
      { cuerpo: dto },
    );
  }

  validarTokenRestablecimiento(dto: ValidarTokenRestablecimientoDto) {
    return this.clienteUsuarios.solicitar(
      'POST',
      '/autenticacion/validar-token-restablecimiento',
      { cuerpo: dto },
    );
  }

  restablecerContrasena(dto: RestablecerContrasenaDto) {
    return this.clienteUsuarios.solicitar(
      'POST',
      '/autenticacion/restablecer-contrasena',
      { cuerpo: dto },
    );
  }
}
