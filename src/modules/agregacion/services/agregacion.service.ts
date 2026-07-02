import { Injectable } from '@nestjs/common';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ProyectosProxyServicio } from '../../projects/services/proyectos-proxy.service';

type RegistroJson = Record<string, unknown>;

interface TipologiaBasica {
  id: number;
  [clave: string]: unknown;
}

@Injectable()
export class AgregacionServicio {
  constructor(
    private readonly proyectosProxy: ProyectosProxyServicio,
    private readonly clienteProyectos: ClienteProyectosServicio,
  ) {}

  async obtenerProyectoCompleto(id: number, token: string) {
    const proyecto = (await this.proyectosProxy.buscarProyectoPorId(
      id,
      token,
    )) as RegistroJson;

    const [imagenes, tipologias, equipamiento] = await Promise.all([
      this.clienteProyectos.solicitar('GET', `/proyectos/${id}/imagenes`, { token }),
      this.clienteProyectos.solicitar<TipologiaBasica[]>(
        'GET',
        `/proyectos/${id}/tipologias`,
        { token },
      ),
      this.clienteProyectos.solicitar('GET', `/proyectos/${id}/equipamiento`, { token }),
    ]);

    const tipologiasConImagenes = await Promise.all(
      tipologias.map(async (tipologia) => {
        const imagenesTipologia = await this.clienteProyectos.solicitar(
          'GET',
          `/proyectos/${id}/tipologias/${tipologia.id}/imagenes`,
          { token },
        );

        return {
          ...tipologia,
          imagenes: imagenesTipologia,
        };
      }),
    );

    return {
      ...proyecto,
      imagenes,
      tipologias: tipologiasConImagenes,
      equipamiento,
    };
  }
}
