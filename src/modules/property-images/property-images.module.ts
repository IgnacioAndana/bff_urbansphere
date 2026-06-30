import { Module } from '@nestjs/common';
import { PropiedadImagenesControlador } from './controllers/propiedad-imagenes.controller';

@Module({
  controllers: [PropiedadImagenesControlador],
})
export class PropertyImagesModule {}
