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
import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
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

  @Get(':id')
  @ApiOperation({ summary: 'Obtener proyecto por ID (proxy → MS Proyectos)' })
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
