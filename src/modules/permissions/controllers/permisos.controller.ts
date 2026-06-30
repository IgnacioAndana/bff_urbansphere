import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';

@ApiTags('Permisos')
@Controller('permisos')
export class PermisosControlador {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar permisos (proxy → MS Usuarios)' })
  listarPermisos(@TokenBearer() token: string) {
    return this.clienteUsuarios.solicitar('GET', '/permisos', { token });
  }
}
