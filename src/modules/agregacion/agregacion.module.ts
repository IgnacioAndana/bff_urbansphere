import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { PropertiesModule } from '../properties/properties.module';
import { AgregacionControlador } from './controllers/agregacion.controller';
import { AgregacionServicio } from './services/agregacion.service';

@Module({
  imports: [ProjectsModule, PropertiesModule],
  controllers: [AgregacionControlador],
  providers: [AgregacionServicio],
})
export class AgregacionModule {}
