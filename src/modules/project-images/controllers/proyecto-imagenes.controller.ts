import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
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
  @UseInterceptors(FileInterceptor('archivo'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Agregar imagen al proyecto, URL o archivo S3 (proxy → MS Proyectos)',
    description:
      'Campos: urlS3, etiqueta, esPortada (opcional), orden. Solo una imagen por proyecto puede ser portada.',
  })
  crearImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Body() dto: CrearProyectoImagenDto,
    @TokenBearer() token: string,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    return this.clienteProyectos.solicitar(
      'POST',
      `/proyectos/${proyectoId}/imagenes`,
      { cuerpo: cuerpoImagenProyectoParaMs(dto), token, archivo },
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar imágenes del proyecto (proxy → MS Proyectos)' })
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
  @UseInterceptors(FileInterceptor('archivo'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Actualizar imagen (metadatos JSON o multipart con archivo opcional — proxy → MS Proyectos)',
    description:
      'esPortada: al marcar true, el MS desmarca la portada anterior del mismo proyecto.',
  })
  actualizarImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarProyectoImagenDto,
    @TokenBearer() token: string,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/proyectos/${proyectoId}/imagenes/${id}`,
      { cuerpo: cuerpoImagenProyectoParaMs(dto), token, archivo },
    );
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
