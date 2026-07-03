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
@ApiBearerAuth()
export class ProyectosControlador {
  constructor(private readonly proyectosProxy: ProyectosProxyServicio) {}

  @Post()
  @ApiOperation({ summary: 'Crear proyecto (admin, agent — proxy → MS Proyectos)' })
  crearProyecto(@Body() dto: CrearProyectoDto, @TokenBearer() token: string) {
    return this.proyectosProxy.crearProyecto(dto, token);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar proyectos (user: solo activos — proxy → MS Proyectos)',
  })
  listarProyectos(@TokenBearer() token: string) {
    return this.proyectosProxy.listarProyectos(token);
  }

  @Post('catalogo')
  @ApiOperation({
    summary: 'Catálogo batch — ficha resumida por lote de IDs (proxy → MS Proyectos)',
    description:
      'Para favoritos y listados: devuelve título, tipo, comuna, urlPortada, rangos de tipologías (UF, m², dormitorios) e omitidos (no_encontrado/inactivo).',
  })
  consultarCatalogo(@Body() dto: ConsultarCatalogoDto, @TokenBearer() token: string) {
    return this.proyectosProxy.consultarCatalogo(dto.ids, token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proyecto por ID (proxy → MS Proyectos)' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  buscarProyectoPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.proyectosProxy.buscarProyectoPorId(id, token);
  }

  @Patch(':id')
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
  @ApiOperation({ summary: 'Eliminar proyecto (admin, agent — proxy → MS Proyectos)' })
  async eliminarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.proyectosProxy.eliminarProyecto(id, token);
  }
}
