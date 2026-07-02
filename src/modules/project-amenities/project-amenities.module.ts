import { Module } from '@nestjs/common';
import { ProyectoEquipamientoControlador } from './controllers/proyecto-equipamiento.controller';

@Module({
  controllers: [ProyectoEquipamientoControlador],
})
export class ProjectAmenitiesModule {}
