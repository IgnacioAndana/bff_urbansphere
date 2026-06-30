import { Module } from '@nestjs/common';
import { AutenticacionControlador } from './controllers/autenticacion.controller';
import { AutenticacionProxyServicio } from './services/autenticacion-proxy.service';

@Module({
  controllers: [AutenticacionControlador],
  providers: [AutenticacionProxyServicio],
})
export class AuthModule {}
