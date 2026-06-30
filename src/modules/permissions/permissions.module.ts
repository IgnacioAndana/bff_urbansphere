import { Module } from '@nestjs/common';
import { PermisosControlador } from './controllers/permisos.controller';

@Module({
  controllers: [PermisosControlador],
})
export class PermissionsModule {}
