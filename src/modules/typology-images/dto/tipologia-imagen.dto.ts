import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CrearTipologiaImagenDto {
  @ApiPropertyOptional({
    example:
      'https://urbansphere-images.s3.us-east-1.amazonaws.com/proyectos/1/tipologias/2/planta.jpg',
  })
  @IsOptional()
  @IsString()
  urlS3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  esPortada?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  esPanoramica360?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}

export class ActualizarTipologiaImagenDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  urlS3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  esPortada?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  esPanoramica360?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
