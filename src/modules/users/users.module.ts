import { Module } from '@nestjs/common';
import { UsuariosControlador } from './controllers/usuarios.controller';
import { UsuariosProxyServicio } from './services/usuarios-proxy.service';

@Module({
  controllers: [UsuariosControlador],
  providers: [UsuariosProxyServicio],
})
export class UsersModule {}
