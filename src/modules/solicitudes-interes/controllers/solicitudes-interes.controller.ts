import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { CrearSolicitudInteresDto } from '../dto/crear-solicitud-interes.dto';
import { SolicitudesInteresProxyServicio } from '../services/solicitudes-interes-proxy.service';

@ApiTags('Solicitudes de interés')
@Controller('solicitudes-interes')
export class SolicitudesInteresControlador {
  constructor(
    private readonly solicitudesProxy: SolicitudesInteresProxyServicio,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Enviar solicitud "Me interesa este proyecto" (público o con sesión)',
    description:
      'Si hay JWT válido, MS Usuarios usa el email de la sesión. Si no, se envían nombre y email.',
  })
  @ApiResponse({ status: 201 })
  crearSolicitud(
    @Body() dto: CrearSolicitudInteresDto,
    @TokenBearer() token?: string,
  ) {
    return this.solicitudesProxy.crearSolicitud(dto, token);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas las solicitudes (admin, agent)' })
  listarSolicitudes(@TokenBearer() token: string) {
    return this.solicitudesProxy.listarSolicitudes(token);
  }

  @Get('proyecto/:proyectoId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar solicitudes de un proyecto (admin, agent)' })
  listarPorProyecto(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token: string,
  ) {
    return this.solicitudesProxy.listarPorProyecto(proyectoId, token);
  }
}
