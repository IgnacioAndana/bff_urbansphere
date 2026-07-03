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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { esMultipart } from '../../../common/utils/es-multipart.util';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import {
  ActualizarProyectoImagenDto,
  CrearProyectoImagenDto,
  cuerpoImagenProyectoParaMs,
} from '../dto/proyecto-imagen.dto';

@ApiTags('Imágenes de proyecto')
@Controller('proyectos/:proyectoId/imagenes')
@ApiBearerAuth()
export class ProyectoImagenesControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Agregar imagen al proyecto, URL o archivo S3 (proxy → MS Proyectos)',
    description:
      'Multipart: reenvía el body tal cual (campo archivo). JSON: urlS3, etiqueta, esPortada, orden.',
  })
  crearImagen(
    @Req() peticion: Request,
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token: string,
  ) {
    const ruta = `/proyectos/${proyectoId}/imagenes`;

    if (esMultipart(peticion)) {
      return this.clienteProyectos.reenviarMultipart('POST', ruta, peticion, token);
    }

    return this.clienteProyectos.solicitar('POST', ruta, {
      cuerpo: cuerpoImagenProyectoParaMs(peticion.body as CrearProyectoImagenDto),
      token,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Listar imágenes del proyecto (proxy → MS Proyectos)',
    description:
      '200 [] si el proyecto existe y no tiene imágenes. 404 si el proyecto no existe.',
  })
  @ApiResponse({ status: 200, description: 'Lista de imágenes (puede ser vacía)' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  listarImagenes(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/proyectos/${proyectoId}/imagenes`,
      { token },
    );
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Actualizar imagen (metadatos JSON o multipart con archivo opcional — proxy → MS Proyectos)',
    description:
      'Multipart: reenvía el body tal cual. esPortada: al marcar true, el MS desmarca la portada anterior.',
  })
  actualizarImagen(
    @Req() peticion: Request,
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ) {
    const ruta = `/proyectos/${proyectoId}/imagenes/${id}`;

    if (esMultipart(peticion)) {
      return this.clienteProyectos.reenviarMultipart('PATCH', ruta, peticion, token);
    }

    return this.clienteProyectos.solicitar('PATCH', ruta, {
      cuerpo: cuerpoImagenProyectoParaMs(peticion.body as ActualizarProyectoImagenDto),
      token,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar imagen (proxy → MS Proyectos)' })
  async eliminarImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar(
      'DELETE',
      `/proyectos/${proyectoId}/imagenes/${id}`,
      { token },
    );
  }
}
