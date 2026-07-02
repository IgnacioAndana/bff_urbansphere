import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
    summary: 'Enviar formulario de contacto (consultas, reservas, etc.)',
    description:
      'Público. Guarda la solicitud en MS Usuarios y envía correo al destinatario interno.',
  })
  @ApiResponse({ status: 201, type: RespuestaSolicitudContactoDto })
  crearSolicitud(@Body() dto: CrearSolicitudContactoDto) {
    return this.solicitudesProxy.crearSolicitud(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar solicitudes de contacto (admin, agent)' })
  @ApiResponse({ status: 200, type: [RespuestaSolicitudContactoDto] })
  listarSolicitudes(@TokenBearer() token: string) {
    return this.solicitudesProxy.listarSolicitudes(token);
  }
}
