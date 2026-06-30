import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { IniciarSesionDto, RefrescarTokenDto } from '../dto/iniciar-sesion.dto';
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
}
