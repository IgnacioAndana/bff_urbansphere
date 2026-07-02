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
      { cuerpo: dto, token, archivo },
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
  @ApiOperation({ summary: 'Actualizar imagen (proxy → MS Proyectos)' })
  actualizarImagen(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarProyectoImagenDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/proyectos/${proyectoId}/imagenes/${id}`,
      { cuerpo: dto, token },
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
