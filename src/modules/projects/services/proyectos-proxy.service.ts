import { Injectable } from '@nestjs/common';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
import { CrearProyectoDto } from '../dto/crear-proyecto.dto';

@Injectable()
export class ProyectosProxyServicio {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  crearProyecto(dto: CrearProyectoDto, token: string) {
    return this.clienteProyectos.solicitar('POST', '/proyectos', { cuerpo: dto, token });
  }

  listarProyectos(token: string) {
    return this.clienteProyectos.solicitar('GET', '/proyectos', { token });
  }

  buscarProyectoPorId(id: number, token: string) {
    return this.clienteProyectos.solicitar('GET', `/proyectos/${id}`, { token });
  }

  actualizarProyecto(id: number, dto: ActualizarProyectoDto, token: string) {
    return this.clienteProyectos.solicitar('PATCH', `/proyectos/${id}`, {
      cuerpo: dto,
      token,
    });
  }

  eliminarProyecto(id: number, token: string) {
    return this.clienteProyectos.solicitar('DELETE', `/proyectos/${id}`, { token });
  }
}
