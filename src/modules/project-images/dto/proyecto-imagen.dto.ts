import { ApiPropertyOptional } from '@nestjs/swagger';
import { Allow } from 'class-validator';

/** Proxy passthrough: el MS normaliza booleanos/enteros desde multipart. */
export class CrearProyectoImagenDto {
  @ApiPropertyOptional({
    example:
      'https://urbansphere-images.s3.us-east-1.amazonaws.com/proyectos/1/galeria/img.jpg',
  })
  @Allow()
  urlS3?: unknown;

  @ApiPropertyOptional({ example: 'fachada', description: 'Etiqueta: fachada, ubicacion, etc.' })
  @Allow()
  etiqueta?: unknown;

  @ApiPropertyOptional()
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional({ description: 'Imagen panorámica 360°' })
  @Allow()
  esPanoramica360?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;
}

export class ActualizarProyectoImagenDto {
  @Allow()
  id?: unknown;

  @Allow()
  proyectoId?: unknown;

  @Allow()
  creadoEn?: unknown;

  @ApiPropertyOptional()
  @Allow()
  urlS3?: unknown;

  @ApiPropertyOptional()
  @Allow()
  etiqueta?: unknown;

  @ApiPropertyOptional()
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional()
  @Allow()
  esPanoramica360?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;
}
