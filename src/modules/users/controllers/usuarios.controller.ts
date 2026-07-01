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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { UsuariosProxyServicio } from '../services/usuarios-proxy.service';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosControlador {
  constructor(private readonly usuariosProxy: UsuariosProxyServicio) {}

  @Post()
  @ApiOperation({
    summary: 'Registro público (sin JWT, rol user) o crear usuario (JWT admin)',
  })
  @ApiResponse({ status: 201 })
  crearUsuario(
    @Body() dto: CrearUsuarioDto,
    @TokenBearer() token?: string,
  ) {
    return this.usuariosProxy.crearUsuario(dto, token);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar usuarios (admin, agent)' })
  listarUsuarios(@TokenBearer() token: string) {
    return this.usuariosProxy.listarUsuarios(token);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID (admin, agent)' })
  buscarUsuarioPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.usuariosProxy.buscarUsuarioPorId(id, token);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar perfil propio o cualquier usuario (admin/agent)',
  })
  actualizarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarUsuarioDto,
    @TokenBearer() token: string,
  ) {
    return this.usuariosProxy.actualizarUsuario(id, dto, token);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario (solo admin)' })
  async eliminarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.usuariosProxy.eliminarUsuario(id, token);
  }
}
