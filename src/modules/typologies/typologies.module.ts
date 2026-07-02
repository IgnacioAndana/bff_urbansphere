import { Module } from '@nestjs/common';
import { TipologiasControlador } from './controllers/tipologias.controller';

@Module({
  controllers: [TipologiasControlador],
})
export class TypologiesModule {}
