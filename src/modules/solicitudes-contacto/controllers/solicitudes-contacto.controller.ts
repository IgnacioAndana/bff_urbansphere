import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ActualizarGestionSolicitudDto } from '../../../common/dto/actualizar-gestion-solicitud.dto';
import { FiltrarSolicitudesQueryDto } from '../../../common/dto/filtrar-solicitudes-query.dto';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { CrearSolicitudContactoDto } from '../dto/crear-solicitud-contacto.dto';
import { RespuestaSolicitudContactoDto } from '../dto/respuesta-solicitud-contacto.dto';
import { SolicitudesContactoProxyServicio } from '../services/solicitudes-contacto-proxy.service';

@ApiTags('Solicitudes de contacto')
@Controller('solicitudes-contacto')
export class SolicitudesContactoControlador {
  constructor(
    private readonly solicitudesProxy: SolicitudesContactoProxyServicio,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Formulario de contacto general (público — proxy → MS Usuarios)',
    description: 'Sin JWT. Estado inicial: pendiente.',
  })
  @ApiResponse({ status: 201, type: RespuestaSolicitudContactoDto })
  crearSolicitud(@Body() dto: CrearSolicitudContactoDto) {
    return this.solicitudesProxy.crearSolicitud(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Panel admin — listar contacto general (proxy → MS Usuarios)' })
  @ApiQuery({ name: 'estado', required: false, enum: ['pendiente', 'resuelta'] })
  @ApiResponse({ status: 200, type: [RespuestaSolicitudContactoDto] })
  listarSolicitudes(
    @Query() filtro: FiltrarSolicitudesQueryDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.listarSolicitudes(token, filtro);
  }

  @Patch(':id/gestion')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Panel admin — marcar resuelta y registrar observación (proxy → MS Usuarios)',
  })
  @ApiResponse({ status: 200, type: RespuestaSolicitudContactoDto })
  actualizarGestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarGestionSolicitudDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.actualizarGestion(id, dto, token);
  }
}
