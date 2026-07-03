import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { AgregarFavoritoDto } from '../dto/agregar-favorito.dto';
import { FavoritosProxyServicio } from '../services/favoritos-proxy.service';

@ApiTags('Favoritos')
@Controller('favoritos')
@ApiBearerAuth()
export class FavoritosControlador {
  constructor(private readonly favoritosProxy: FavoritosProxyServicio) {}

  @Get('ids')
  @ApiOperation({
    summary: 'IDs de proyectos favoritos del usuario (proxy → MS Usuarios)',
  })
  listarIds(@TokenBearer() token: string) {
    return this.favoritosProxy.listarIds(token);
  }

  @Get('proyecto/:proyectoId')
  @ApiOperation({
    summary: 'Comprobar si un proyecto es favorito (proxy → MS Usuarios)',
  })
  esFavorito(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token: string,
  ) {
    return this.favoritosProxy.esFavorito(proyectoId, token);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar mis favoritos (proxy → MS Usuarios)',
    description:
      'Devuelve total, proyectoIds y favoritos con agregadoEn (ISO). Datos del proyecto vía POST /proyectos/catalogo.',
  })
  listar(@TokenBearer() token: string) {
    return this.favoritosProxy.listar(token);
  }

  @Post()
  @ApiOperation({ summary: 'Marcar proyecto como favorito (proxy → MS Usuarios)' })
  agregar(@Body() dto: AgregarFavoritoDto, @TokenBearer() token: string) {
    return this.favoritosProxy.agregar(dto, token);
  }

  @Delete(':proyectoId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Quitar de favoritos (proxy → MS Usuarios)' })
  async quitar(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.favoritosProxy.quitar(proyectoId, token);
  }
}
