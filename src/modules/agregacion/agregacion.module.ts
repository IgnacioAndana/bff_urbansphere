import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { AgregacionControlador } from './controllers/agregacion.controller';
import { AgregacionServicio } from './services/agregacion.service';

@Module({
  imports: [ProjectsModule],
  controllers: [AgregacionControlador],
  providers: [AgregacionServicio],
})
export class AgregacionModule {}
