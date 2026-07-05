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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
import { ConsultarCatalogoDto } from '../dto/consultar-catalogo.dto';
import { CrearProyectoDto } from '../dto/crear-proyecto.dto';
import { ProyectosProxyServicio } from '../services/proyectos-proxy.service';

@ApiTags('Proyectos')
@Controller('proyectos')
export class ProyectosControlador {
  constructor(private readonly proyectosProxy: ProyectosProxyServicio) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear proyecto (admin, agent — proxy → MS Proyectos)' })
  crearProyecto(@Body() dto: CrearProyectoDto, @TokenBearer() token: string) {
    return this.proyectosProxy.crearProyecto(dto, token);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar proyectos (público: solo activos — proxy → MS Proyectos)',
    description: 'Sin JWT devuelve solo activos. Con JWT admin/agent incluye todos los estados.',
  })
  listarProyectos(@TokenBearer() token?: string) {
    return this.proyectosProxy.listarProyectos(token);
  }

  @Post('catalogo')
  @ApiOperation({
    summary: 'Catálogo batch — ficha resumida por lote de IDs (público — proxy → MS Proyectos)',
    description:
      'Sin JWT: solo proyectos activos. Con JWT admin/agent incluye inactivos. Devuelve título, tipo, comuna, urlPortada, rangos de tipologías e omitidos.',
  })
  consultarCatalogo(@Body() dto: ConsultarCatalogoDto, @TokenBearer() token?: string) {
    return this.proyectosProxy.consultarCatalogo(dto.ids, token);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener proyecto por ID (público — proxy → MS Proyectos)',
    description: 'Sin JWT: solo proyectos activos. Con JWT admin/agent incluye cualquier estado.',
  })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  buscarProyectoPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token?: string,
  ) {
    return this.proyectosProxy.buscarProyectoPorId(id, token);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar proyecto (admin, agent — proxy → MS Proyectos)' })
  actualizarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarProyectoDto,
    @TokenBearer() token: string,
  ) {
    return this.proyectosProxy.actualizarProyecto(id, dto, token);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar proyecto (admin, agent — proxy → MS Proyectos)' })
  async eliminarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.proyectosProxy.eliminarProyecto(id, token);
  }
}
