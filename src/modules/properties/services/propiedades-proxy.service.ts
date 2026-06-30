import { Injectable } from '@nestjs/common';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ActualizarPropiedadDto } from '../dto/actualizar-propiedad.dto';
import { CrearPropiedadDto } from '../dto/crear-propiedad.dto';

@Injectable()
export class PropiedadesProxyServicio {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  crearPropiedad(dto: CrearPropiedadDto, token: string) {
    return this.clienteProyectos.solicitar('POST', '/propiedades', { cuerpo: dto, token });
  }

  listarPropiedades(token: string, proyectoId?: number) {
    return this.clienteProyectos.solicitar('GET', '/propiedades', {
      token,
      params: proyectoId ? { proyectoId } : undefined,
    });
  }

  buscarPropiedadPorId(id: number, token: string) {
    return this.clienteProyectos.solicitar('GET', `/propiedades/${id}`, { token });
  }

  actualizarPropiedad(id: number, dto: ActualizarPropiedadDto, token: string) {
    return this.clienteProyectos.solicitar('PATCH', `/propiedades/${id}`, {
      cuerpo: dto,
      token,
    });
  }

  eliminarPropiedad(id: number, token: string) {
    return this.clienteProyectos.solicitar('DELETE', `/propiedades/${id}`, { token });
  }
}
