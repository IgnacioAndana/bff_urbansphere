import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { esMultipart } from '../../../common/utils/es-multipart.util';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import {
  ActualizarTipologiaImagenDto,
  CrearTipologiaImagenDto,
  cuerpoImagenTipologiaParaMs,
} from '../dto/tipologia-imagen.dto';

@ApiTags('Imágenes de tipología')
@Controller('proyectos/:proyectoId/tipologias/:tipologiaId/imagenes')
@ApiBearerAuth()
export class TipologiaImagenesControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Agregar imagen a tipología, URL o archivo S3 (proxy → MS Proyectos)',
    description:
      'Multipart: reenvía el body tal cual (campo archivo). JSON: urlS3, esPortada, orden.',
  })
  crearImagen(
    @Req() peticion: Request,
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @TokenBearer() token: string,
  ) {
    const ruta = `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes`;

    if (esMultipart(peticion)) {
      return this.clienteProyectos.reenviarMultipart('POST', ruta, peticion, token);
    }

    return this.clienteProyectos.solicitar('POST', ruta, {
      cuerpo: cuerpoImagenTipologiaParaMs(peticion.body as CrearTipologiaImagenDto),
      token,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar imágenes de tipología (proxy → MS Proyectos)' })
  listarImagenes(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes`,
      { token },
    );
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary:
      'Actualizar imagen de tipología (metadatos JSON o multipart con archivo opcional — proxy → MS Proyectos)',
    description: 'Multipart: reenvía el body tal cual hacia MS Proyectos.',
  })
  actualizarImagen(
    @Req() peticion: Request,
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    const ruta = `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes/${id}`;

    if (esMultipart(peticion)) {
      return this.clienteProyectos.reenviarMultipart('PATCH', ruta, peticion, token);
    }

    return this.clienteProyectos.solicitar('PATCH', ruta, {
      cuerpo: cuerpoImagenTipologiaParaMs(peticion.body as ActualizarTipologiaImagenDto),
      token,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar imagen de tipología (proxy → MS Proyectos)' })
  async eliminarImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar(
      'DELETE',
      `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes/${id}`,
      { token },
    );
  }
}
