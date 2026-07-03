import { ApiPropertyOptional } from '@nestjs/swagger';
import { Allow } from 'class-validator';

/** Proxy passthrough: el MS normaliza booleanos/enteros desde multipart. */
export class CrearTipologiaImagenDto {
  @ApiPropertyOptional({
    example:
      'https://urbansphere-images.s3.us-east-1.amazonaws.com/proyectos/1/tipologias/2/planta.jpg',
  })
  @Allow()
  urlS3?: unknown;

  @ApiPropertyOptional({
    example: false,
    description:
      'Opcional (default false). Solo una imagen por tipología puede ser portada; al marcar una nueva, el MS desmarca la anterior.',
  })
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;
}

export class ActualizarTipologiaImagenDto {
  @Allow()
  id?: unknown;

  @Allow()
  tipologiaId?: unknown;

  @Allow()
  creadoEn?: unknown;

  @ApiPropertyOptional()
  @Allow()
  urlS3?: unknown;

  @ApiPropertyOptional({
    description:
      'Si true, esta imagen pasa a ser la portada de la tipología (solo una por tipología).',
  })
  @Allow()
  esPortada?: unknown;

  @ApiPropertyOptional()
  @Allow()
  orden?: unknown;
}

export function cuerpoImagenTipologiaParaMs(
  dto: CrearTipologiaImagenDto | ActualizarTipologiaImagenDto,
): Record<string, unknown> {
  const campos = {
    urlS3: dto.urlS3,
    esPortada: dto.esPortada,
    orden: dto.orden,
  };

  return Object.fromEntries(
    Object.entries(campos).filter(([, valor]) => valor !== undefined),
  );
}
