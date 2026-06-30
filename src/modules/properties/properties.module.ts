import { Module } from '@nestjs/common';
import { PropiedadesControlador } from './controllers/propiedades.controller';
import { PropiedadesProxyServicio } from './services/propiedades-proxy.service';

@Module({
  controllers: [PropiedadesControlador],
  providers: [PropiedadesProxyServicio],
  exports: [PropiedadesProxyServicio],
})
export class PropertiesModule {}
