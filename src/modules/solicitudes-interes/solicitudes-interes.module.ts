import { Module } from '@nestjs/common';
import { SolicitudesInteresControlador } from './controllers/solicitudes-interes.controller';
import { SolicitudesInteresProxyServicio } from './services/solicitudes-interes-proxy.service';

@Module({
  controllers: [SolicitudesInteresControlador],
  providers: [SolicitudesInteresProxyServicio],
})
export class SolicitudesInteresModule {}
