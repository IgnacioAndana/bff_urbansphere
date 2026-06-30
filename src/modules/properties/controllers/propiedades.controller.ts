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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ActualizarPropiedadDto } from '../dto/actualizar-propiedad.dto';
import { CrearPropiedadDto } from '../dto/crear-propiedad.dto';
import { PropiedadesProxyServicio } from '../services/propiedades-proxy.service';

@ApiTags('Propiedades')
@Controller('propiedades')
@ApiBearerAuth()
export class PropiedadesControlador {
  constructor(private readonly propiedadesProxy: PropiedadesProxyServicio) {}

  @Post()
  @ApiOperation({ summary: 'Crear propiedad (proxy → MS Proyectos)' })
  crearPropiedad(@Body() dto: CrearPropiedadDto, @TokenBearer() token: string) {
    return this.propiedadesProxy.crearPropiedad(dto, token);
  }

  @Get()
  @ApiOperation({ summary: 'Listar propiedades (proxy → MS Proyectos)' })
  listarPropiedades(
    @TokenBearer() token: string,
    @Query('proyectoId') proyectoId?: string,
  ) {
    const idProyecto = proyectoId ? parseInt(proyectoId, 10) : undefined;
    return this.propiedadesProxy.listarPropiedades(token, idProyecto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener propiedad por ID (proxy → MS Proyectos)' })
  buscarPropiedadPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.propiedadesProxy.buscarPropiedadPorId(id, token);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar propiedad (proxy → MS Proyectos)' })
  actualizarPropiedad(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPropiedadDto,
    @TokenBearer() token: string,
  ) {
    return this.propiedadesProxy.actualizarPropiedad(id, dto, token);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar propiedad (proxy → MS Proyectos)' })
  async eliminarPropiedad(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.propiedadesProxy.eliminarPropiedad(id, token);
  }
}
