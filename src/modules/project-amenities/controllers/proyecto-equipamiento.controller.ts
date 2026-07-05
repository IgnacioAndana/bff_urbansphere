import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import { ActualizarProyectoEquipamientoDto } from '../dto/proyecto-equipamiento.dto';

@ApiTags('Equipamiento de proyecto')
@Controller('proyectos/:proyectoId/equipamiento')
export class ProyectoEquipamientoControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Get()
  @ApiOperation({ summary: 'Obtener equipamiento del proyecto (público — proxy → MS Proyectos)' })
  obtenerEquipamiento(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token?: string,
  ) {
    return this.clienteProyectos.solicitar('GET', `/proyectos/${proyectoId}/equipamiento`, {
      token,
    });
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar equipamiento (admin, agent — proxy → MS Proyectos)',
  })
  actualizarEquipamiento(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() dto: ActualizarProyectoEquipamientoDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar('PUT', `/proyectos/${proyectoId}/equipamiento`, {
      cuerpo: {
        gimnasio: dto.gimnasio,
        quincho: dto.quincho,
        areasVerdes: dto.areasVerdes,
        bicicletero: dto.bicicletero,
        piscina: dto.piscina,
        juegosInfantiles: dto.juegosInfantiles,
        gourmetLounge: dto.gourmetLounge,
        coworkingRoom: dto.coworkingRoom,
      },
      token,
    });
  }
}
