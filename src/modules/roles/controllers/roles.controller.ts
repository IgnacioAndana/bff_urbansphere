import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ClienteUsuariosServicio } from '../../../proxy/cliente-usuarios.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesControlador {
  constructor(private readonly clienteUsuarios: ClienteUsuariosServicio) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar roles (proxy → MS Usuarios)' })
  listarRoles(@TokenBearer() token: string) {
    return this.clienteUsuarios.solicitar('GET', '/roles', { token });
  }
}
