import { Module } from '@nestjs/common';
import { PropiedadCaracteristicasControlador } from './controllers/propiedad-caracteristicas.controller';

@Module({
  controllers: [PropiedadCaracteristicasControlador],
})
export class PropertyFeaturesModule {}
