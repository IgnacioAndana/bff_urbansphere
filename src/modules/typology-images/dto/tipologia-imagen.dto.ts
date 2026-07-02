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
