import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { IniciarSesionDto, RefrescarTokenDto } from '../dto/iniciar-sesion.dto';
import {
  RestablecerContrasenaDto,
  SolicitarRestablecimientoDto,
  ValidarTokenRestablecimientoDto,
} from '../dto/restablecer-contrasena.dto';
import { AutenticacionProxyServicio } from '../services/autenticacion-proxy.service';

@ApiTags('Autenticación')
@Controller('autenticacion')
export class AutenticacionControlador {
  constructor(private readonly autenticacionProxy: AutenticacionProxyServicio) {}

  @Post('iniciar-sesion')
  @ApiOperation({ summary: 'Iniciar sesión (proxy → MS Usuarios)' })
  iniciarSesion(@Body() dto: IniciarSesionDto) {
    return this.autenticacionProxy.iniciarSesion(dto);
  }

  @Post('refrescar')
  @ApiOperation({ summary: 'Refrescar token (proxy → MS Usuarios)' })
  refrescarToken(@Body() dto: RefrescarTokenDto) {
    return this.autenticacionProxy.refrescarToken(dto);
  }

  @Post('cerrar-sesion')
  @ApiOperation({ summary: 'Cerrar sesión (proxy → MS Usuarios)' })
  cerrarSesion(@Body() dto: RefrescarTokenDto) {
    return this.autenticacionProxy.cerrarSesion(dto);
  }

  @Get('perfil')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil del usuario autenticado (proxy → MS Usuarios)' })
  obtenerPerfil(@TokenBearer() token: string) {
    return this.autenticacionProxy.obtenerPerfil(token);
  }

  @Post('solicitar-restablecimiento')
  @ApiOperation({
    summary: 'Validar email y enviar enlace de restablecimiento (proxy → MS Usuarios)',
  })
  @ApiResponse({ status: 404, description: 'No existe cuenta con ese email' })
  solicitarRestablecimiento(@Body() dto: SolicitarRestablecimientoDto) {
    return this.autenticacionProxy.solicitarRestablecimiento(dto);
  }

  @Post('validar-token-restablecimiento')
  @ApiOperation({
    summary: 'Validar token de restablecimiento (proxy → MS Usuarios)',
  })
  validarTokenRestablecimiento(@Body() dto: ValidarTokenRestablecimientoDto) {
    return this.autenticacionProxy.validarTokenRestablecimiento(dto);
  }

  @Post('restablecer-contrasena')
  @ApiOperation({
    summary: 'Restablecer contraseña con token de un solo uso (proxy → MS Usuarios)',
  })
  restablecerContrasena(@Body() dto: RestablecerContrasenaDto) {
    return this.autenticacionProxy.restablecerContrasena(dto);
  }
}
