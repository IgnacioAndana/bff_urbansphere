import { Injectable } from '@nestjs/common';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ProyectosProxyServicio } from '../../projects/services/proyectos-proxy.service';
import { PropiedadesProxyServicio } from '../../properties/services/propiedades-proxy.service';

type RegistroJson = Record<string, unknown>;

interface PropiedadBasica {
  id: number;
  [clave: string]: unknown;
}

@Injectable()
export class AgregacionServicio {
  constructor(
    private readonly proyectosProxy: ProyectosProxyServicio,
    private readonly propiedadesProxy: PropiedadesProxyServicio,
    private readonly clienteProyectos: ClienteProyectosServicio,
  ) {}

  async obtenerProyectoCompleto(id: number, token: string) {
    const proyecto = (await this.proyectosProxy.buscarProyectoPorId(
      id,
      token,
    )) as RegistroJson;
    const propiedades = (await this.propiedadesProxy.listarPropiedades(
      token,
      id,
    )) as PropiedadBasica[];

    const propiedadesConDetalle = await Promise.all(
      propiedades.map(async (propiedad) => {
        const [imagenes, caracteristicas, toursVirtuales] = await Promise.all([
          this.clienteProyectos.solicitar(
            'GET',
            `/propiedades/${propiedad.id}/imagenes`,
            { token },
          ),
          this.clienteProyectos.solicitar(
            'GET',
            `/propiedades/${propiedad.id}/caracteristicas`,
            { token },
          ),
          this.clienteProyectos.solicitar(
            'GET',
            `/propiedades/${propiedad.id}/tours-virtuales`,
            { token },
          ),
        ]);

        return {
          ...propiedad,
          imagenes,
          caracteristicas,
          toursVirtuales,
        };
      }),
    );

    return {
      ...proyecto,
      propiedades: propiedadesConDetalle,
    };
  }

  async obtenerPropiedadCompleta(id: number, token: string) {
    const propiedad = (await this.propiedadesProxy.buscarPropiedadPorId(
      id,
      token,
    )) as RegistroJson;

    const [imagenes, caracteristicas, toursVirtuales] = await Promise.all([
      this.clienteProyectos.solicitar('GET', `/propiedades/${id}/imagenes`, { token }),
      this.clienteProyectos.solicitar('GET', `/propiedades/${id}/caracteristicas`, {
        token,
      }),
      this.clienteProyectos.solicitar('GET', `/propiedades/${id}/tours-virtuales`, {
        token,
      }),
    ]);

    return {
      ...propiedad,
      imagenes,
      caracteristicas,
      toursVirtuales,
    };
  }
}
