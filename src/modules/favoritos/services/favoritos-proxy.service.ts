import { Injectable } from '@nestjs/common';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';
import { AgregarFavoritoDto } from '../dto/agregar-favorito.dto';

@Injectable()
export class FavoritosProxyServicio {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  listarIds(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/favoritos/ids', { token });
  }

  esFavorito(proyectoId: number, token: string) {
    return this.clienteUsuarios.solicitar('GET', `/favoritos/proyecto/${proyectoId}`, {
      token,
    });
  }

  listar(token: string) {
    return this.clienteUsuarios.solicitar('GET', '/favoritos', { token });
  }

  agregar(dto: AgregarFavoritoDto, token: string) {
    return this.clienteUsuarios.solicitar('POST', '/favoritos', { cuerpo: dto, token });
  }

  quitar(proyectoId: number, token: string) {
    return this.clienteUsuarios.solicitar('DELETE', `/favoritos/${proyectoId}`, { token });
  }
}
