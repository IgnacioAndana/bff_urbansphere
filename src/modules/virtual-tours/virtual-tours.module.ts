import { Module } from '@nestjs/common';
import { ToursVirtualesControlador } from './controllers/tours-virtuales.controller';

@Module({
  controllers: [ToursVirtualesControlador],
})
export class VirtualToursModule {}
