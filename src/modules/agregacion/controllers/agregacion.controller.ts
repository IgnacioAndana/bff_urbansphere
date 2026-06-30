import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { AgregacionServicio } from '../services/agregacion.service';

@ApiTags('Agregación')
@Controller('agregacion')
@ApiBearerAuth()
export class AgregacionControlador {
  constructor(private readonly agregacionServicio: AgregacionServicio) {}

  @Get('proyectos/:id/completo')
  @ApiOperation({
    summary: 'Proyecto con propiedades, imágenes, características y tours',
  })
  obtenerProyectoCompleto(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.agregacionServicio.obtenerProyectoCompleto(id, token);
  }

  @Get('propiedades/:id/completa')
  @ApiOperation({
    summary: 'Propiedad con imágenes, características y tours virtuales',
  })
  obtenerPropiedadCompleta(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.agregacionServicio.obtenerPropiedadCompleta(id, token);
  }
}
