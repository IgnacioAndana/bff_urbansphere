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
  ActualizarTipologiaDto,
  CrearTipologiaDto,
} from '../dto/tipologia.dto';

@ApiTags('Tipologías')
@Controller('proyectos/:proyectoId/tipologias')
export class TipologiasControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear tipología (admin, agent — proxy → MS Proyectos)' })
  crearTipologia(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() dto: CrearTipologiaDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar('POST', `/proyectos/${proyectoId}/tipologias`, {
      cuerpo: dto,
      token,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipologías (público — proxy → MS Proyectos)' })
  listarTipologias(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token?: string,
  ) {
    return this.clienteProyectos.solicitar('GET', `/proyectos/${proyectoId}/tipologias`, {
      token,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tipología por ID (público — proxy → MS Proyectos)' })
  buscarTipologia(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token?: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/proyectos/${proyectoId}/tipologias/${id}`,
      { token },
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar tipología (admin, agent — proxy → MS Proyectos)' })
  actualizarTipologia(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarTipologiaDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/proyectos/${proyectoId}/tipologias/${id}`,
      { cuerpo: dto, token },
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar tipología (admin, agent — proxy → MS Proyectos)' })
  async eliminarTipologia(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar(
      'DELETE',
      `/proyectos/${proyectoId}/tipologias/${id}`,
      { token },
    );
  }
}
