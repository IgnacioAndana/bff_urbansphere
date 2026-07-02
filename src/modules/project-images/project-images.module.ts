import { Module } from '@nestjs/common';
import { ProyectoImagenesControlador } from './controllers/proyecto-imagenes.controller';

@Module({
  controllers: [ProyectoImagenesControlador],
})
export class ProjectImagesModule {}
