import { Injectable } from '@nestjs/common';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Injectable()
export class UsuariosProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  crearUsuario(dto: CrearUsuarioDto, token?: string) {
    return this.clienteUsuarios.solicitar('POST', '/usuarios', { cuerpo: dto, token });
  }

  listarUsuarios(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/usuarios', { token });
  }

  buscarUsuarioPorId(id: number, token: string) {
    return this.clienteUsuarios.solicitar('GET', `/usuarios/${id}`, { token });
  }

  actualizarUsuario(id: number, dto: ActualizarUsuarioDto, token: string) {
    return this.clienteUsuarios.solicitar('PATCH', `/usuarios/${id}`, {
      cuerpo: dto,
      token,
    });
  }

  eliminarUsuario(id: number, token: string) {
    return this.clienteUsuarios.solicitar('DELETE', `/usuarios/${id}`, { token });
  }
}
