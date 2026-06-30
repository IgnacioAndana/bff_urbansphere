import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import {
  ActualizarTourVirtualDto,
  CrearTourVirtualDto,
} from '../dto/tour-virtual.dto';

@ApiTags('Tours virtuales')
@Controller()
@ApiBearerAuth()
export class ToursVirtualesControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post('propiedades/:propiedadId/tours-virtuales')
  @ApiOperation({ summary: 'Crear tour virtual (proxy → MS Proyectos)' })
  crearTour(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Body() dto: CrearTourVirtualDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'POST',
      `/propiedades/${propiedadId}/tours-virtuales`,
      { cuerpo: dto, token },
    );
  }

  @Get('propiedades/:propiedadId/tours-virtuales')
  @ApiOperation({ summary: 'Listar tours de una propiedad (proxy → MS Proyectos)' })
  listarToursPorPropiedad(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/propiedades/${propiedadId}/tours-virtuales`,
      { token },
    );
  }

  @Get('tours-virtuales/:id')
  @ApiOperation({ summary: 'Obtener tour por ID (proxy → MS Proyectos)' })
  buscarTourPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar('GET', `/tours-virtuales/${id}`, { token });
  }

  @Patch('tours-virtuales/:id')
  @ApiOperation({ summary: 'Actualizar tour virtual (proxy → MS Proyectos)' })
  actualizarTour(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarTourVirtualDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar('PATCH', `/tours-virtuales/${id}`, {
      cuerpo: dto,
      token,
    });
  }

  @Delete('tours-virtuales/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar tour virtual (proxy → MS Proyectos)' })
  async eliminarTour(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar('DELETE', `/tours-virtuales/${id}`, { token });
  }
}
