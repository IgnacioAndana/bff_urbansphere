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
  @ApiOperation({ summary: 'Registrar un nuevo usuario (proxy → MS Usuarios)' })
  @ApiResponse({ status: 201 })
  crearUsuario(@Body() dto: CrearUsuarioDto) {
    return this.usuariosProxy.crearUsuario(dto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios (proxy → MS Usuarios)' })
  listarUsuarios(@TokenBearer() token: string) {
    return this.usuariosProxy.listarUsuarios(token);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario por ID (proxy → MS Usuarios)' })
  buscarUsuarioPorId(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.usuariosProxy.buscarUsuarioPorId(id, token);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario (proxy → MS Usuarios)' })
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
  @ApiOperation({ summary: 'Eliminar usuario (proxy → MS Usuarios)' })
  async eliminarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.usuariosProxy.eliminarUsuario(id, token);
  }
}
