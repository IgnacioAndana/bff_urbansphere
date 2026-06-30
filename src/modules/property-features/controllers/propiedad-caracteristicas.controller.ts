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
  ActualizarPropiedadCaracteristicaDto,
  CrearPropiedadCaracteristicaDto,
} from '../dto/propiedad-caracteristica.dto';

@ApiTags('Características de propiedad')
@Controller('propiedades/:propiedadId/caracteristicas')
@ApiBearerAuth()
export class PropiedadCaracteristicasControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @ApiOperation({ summary: 'Agregar característica (proxy → MS Proyectos)' })
  crearCaracteristica(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Body() dto: CrearPropiedadCaracteristicaDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'POST',
      `/propiedades/${propiedadId}/caracteristicas`,
      { cuerpo: dto, token },
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar características (proxy → MS Proyectos)' })
  listarCaracteristicas(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/propiedades/${propiedadId}/caracteristicas`,
      { token },
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar característica (proxy → MS Proyectos)' })
  actualizarCaracteristica(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPropiedadCaracteristicaDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/propiedades/${propiedadId}/caracteristicas/${id}`,
      { cuerpo: dto, token },
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar característica (proxy → MS Proyectos)' })
  async eliminarCaracteristica(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar(
      'DELETE',
      `/propiedades/${propiedadId}/caracteristicas/${id}`,
      { token },
    );
  }
}
