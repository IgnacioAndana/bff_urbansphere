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
    summary: 'Proyecto con imágenes, tipologías (con imágenes) y equipamiento',
  })
  obtenerProyectoCompleto(
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    return this.agregacionServicio.obtenerProyectoCompleto(id, token);
  }
}
