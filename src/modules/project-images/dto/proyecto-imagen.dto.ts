import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CrearProyectoImagenDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  urlS3?: string;

  @ApiPropertyOptional({ example: 'fachada', description: 'Etiqueta: fachada, ubicacion, etc.' })
  @IsOptional()
  @IsString()
  etiqueta?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  esPortada?: boolean;

  @ApiPropertyOptional({ description: 'Imagen panorámica 360°' })
  @IsOptional()
  @IsBoolean()
  esPanoramica360?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}

export class ActualizarProyectoImagenDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  urlS3?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  etiqueta?: string;

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
