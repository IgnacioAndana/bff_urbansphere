import { Module } from '@nestjs/common';
import { RolesControlador } from './controllers/roles.controller';

@Module({
  controllers: [RolesControlador],
})
export class RolesModule {}
