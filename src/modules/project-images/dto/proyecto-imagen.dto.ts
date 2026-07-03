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

  @ApiPropertyOptional({
    example: false,
    description:
      'Opcional (default false). Solo una imagen por proyecto puede ser portada; al marcar una nueva, el MS desmarca la anterior.',
  })
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;

  /** Campo legacy del front; ya no existe en MS — se acepta pero no se reenvía. */
  @Allow()
  esPanoramica360?: unknown;
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

  @ApiPropertyOptional({
    description:
      'Si true, esta imagen pasa a ser la portada del proyecto (solo una por proyecto).',
  })
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;

  @Allow()
  esPanoramica360?: unknown;
}

export function cuerpoImagenProyectoParaMs(
  dto: CrearProyectoImagenDto | ActualizarProyectoImagenDto,
): Record<string, unknown> {
  const campos = {
    urlS3: dto.urlS3,
    etiqueta: dto.etiqueta,
    esPortada: dto.esPortada,
    orden: dto.orden,
  };

  return Object.fromEntries(
    Object.entries(campos).filter(([, valor]) => valor !== undefined),
  );
}
