import { Module } from '@nestjs/common';
import { SolicitudesContactoControlador } from './controllers/solicitudes-contacto.controller';
import { SolicitudesContactoProxyServicio } from './services/solicitudes-contacto-proxy.service';

@Module({
  controllers: [SolicitudesContactoControlador],
  providers: [SolicitudesContactoProxyServicio],
})
export class SolicitudesContactoModule {}
