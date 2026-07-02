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
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenBearer } from '../../../common/decorators/token-bearer.decorator';
import { ClienteProyectosServicio } from '../../../proxy/cliente-proyectos.service';
import {
  ActualizarTipologiaImagenDto,
  CrearTipologiaImagenDto,
} from '../dto/tipologia-imagen.dto';

@ApiTags('Imágenes de tipología')
@Controller('proyectos/:proyectoId/tipologias/:tipologiaId/imagenes')
@ApiBearerAuth()
export class TipologiaImagenesControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary: 'Agregar imagen a tipología, URL o archivo S3 (proxy → MS Proyectos)',
  })
  crearImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @Body() dto: CrearTipologiaImagenDto,
    @TokenBearer() token: string,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    return this.clienteProyectos.solicitar(
      'POST',
      `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes`,
      { cuerpo: dto, token, archivo },
    );
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
  @UseInterceptors(FileInterceptor('archivo'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({
    summary:
      'Actualizar imagen de tipología (metadatos JSON o multipart con archivo opcional — proxy → MS Proyectos)',
  })
  actualizarImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('tipologiaId', ParseIntPipe) tipologiaId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarTipologiaImagenDto,
    @TokenBearer() token: string,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/proyectos/${proyectoId}/tipologias/${tipologiaId}/imagenes/${id}`,
      { cuerpo: dto, token, archivo },
    );
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
