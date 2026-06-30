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
  ActualizarPropiedadImagenDto,
  CrearPropiedadImagenDto,
} from '../dto/propiedad-imagen.dto';

@ApiTags('Imágenes de propiedad')
@Controller('propiedades/:propiedadId/imagenes')
@ApiBearerAuth()
export class PropiedadImagenesControlador {
  constructor(private readonly clienteProyectos: ClienteProyectosServicio) {}

  @Post()
  @UseInterceptors(FileInterceptor('archivo'))
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiOperation({ summary: 'Agregar imagen (proxy → MS Proyectos)' })
  crearImagen(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Body() dto: CrearPropiedadImagenDto,
    @TokenBearer() token: string,
    @UploadedFile() archivo?: Express.Multer.File,
  ) {
    return this.clienteProyectos.solicitar(
      'POST',
      `/propiedades/${propiedadId}/imagenes`,
      { cuerpo: dto, token, archivo },
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar imágenes (proxy → MS Proyectos)' })
  listarImagenes(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'GET',
      `/propiedades/${propiedadId}/imagenes`,
      { token },
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar imagen (proxy → MS Proyectos)' })
  actualizarImagen(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPropiedadImagenDto,
    @TokenBearer() token: string,
  ) {
    return this.clienteProyectos.solicitar(
      'PATCH',
      `/propiedades/${propiedadId}/imagenes/${id}`,
      { cuerpo: dto, token },
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar imagen (proxy → MS Proyectos)' })
  async eliminarImagen(
    @Param('propiedadId', ParseIntPipe) propiedadId: number,
    @Param('id', ParseIntPipe) id: number,
    @TokenBearer() token: string,
  ): Promise<void> {
    await this.clienteProyectos.solicitar(
      'DELETE',
      `/propiedades/${propiedadId}/imagenes/${id}`,
      { token },
    );
  }
}
