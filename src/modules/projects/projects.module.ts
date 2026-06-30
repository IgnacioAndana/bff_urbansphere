import { Module } from '@nestjs/common';
import { ProyectosControlador } from './controllers/proyectos.controller';
import { ProyectosProxyServicio } from './services/proyectos-proxy.service';

@Module({
  controllers: [ProyectosControlador],
  providers: [ProyectosProxyServicio],
  exports: [ProyectosProxyServicio],
})
export class ProjectsModule {}
