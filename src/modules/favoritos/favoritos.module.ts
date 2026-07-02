import { Module } from '@nestjs/common';
import { FavoritosControlador } from './controllers/favoritos.controller';
import { FavoritosProxyServicio } from './services/favoritos-proxy.service';

@Module({
  controllers: [FavoritosControlador],
  providers: [FavoritosProxyServicio],
})
export class FavoritosModule {}
