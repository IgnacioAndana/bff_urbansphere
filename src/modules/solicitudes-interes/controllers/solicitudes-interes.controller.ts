import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { CrearSolicitudInteresDto } from '../dto/crear-solicitud-interes.dto';
import { RespuestaSolicitudInteresDto } from '../dto/respuesta-solicitud-interes.dto';
import { SolicitudesInteresProxyServicio } from '../services/solicitudes-interes-proxy.service';

@ApiTags('Solicitudes de interés')
@Controller('solicitudes-interes')
export class SolicitudesInteresControlador {
  constructor(
    private readonly solicitudesProxy: SolicitudesInteresProxyServicio,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Enviar "Me interesa este proyecto" (usuario logueado — proxy → MS Usuarios)',
    description: 'Requiere JWT. Nombre y email se toman de la cuenta. Estado inicial: pendiente.',
  })
  @ApiResponse({ status: 201, type: RespuestaSolicitudInteresDto })
  crearSolicitud(
    @Body() dto: CrearSolicitudInteresDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.crearSolicitud(dto, token);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Panel admin — listar solicitudes de interés (proxy → MS Usuarios)' })
  @ApiQuery({ name: 'estado', required: false, enum: ['pendiente', 'resuelta'] })
  @ApiResponse({ status: 200, type: [RespuestaSolicitudInteresDto] })
  listarSolicitudes(
    @Query() filtro: FiltrarSolicitudesQueryDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.listarSolicitudes(token, filtro);
  }

  @Get('proyecto/:proyectoId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Panel admin — interés por proyecto (proxy → MS Usuarios)' })
  @ApiQuery({ name: 'estado', required: false, enum: ['pendiente', 'resuelta'] })
  @ApiResponse({ status: 200, type: [RespuestaSolicitudInteresDto] })
  listarPorProyecto(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Query() filtro: FiltrarSolicitudesQueryDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.listarPorProyecto(proyectoId, token, filtro);
  }

  @Patch(':id/gestion')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Panel admin — marcar resuelta y registrar observación (proxy → MS Usuarios)',
  })
  @ApiResponse({ status: 200, type: RespuestaSolicitudInteresDto })
  actualizarGestion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarGestionSolicitudDto,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.actualizarGestion(id, dto, token);
  }
}
