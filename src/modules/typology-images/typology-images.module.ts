import { Module } from '@nestjs/common';
import { TipologiaImagenesControlador } from './controllers/tipologia-imagenes.controller';

@Module({
  controllers: [TipologiaImagenesControlador],
})
export class TypologyImagesModule {}
