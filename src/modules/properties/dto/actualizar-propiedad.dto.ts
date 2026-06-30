import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EstadoPropiedad } from '../../../common/enums/estado-propiedad.enum';

export class ActualizarPropiedadDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  proyectoId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  dormitorios?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  banos?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  areaM2?: number;

  @ApiPropertyOptional({ enum: EstadoPropiedad })
  @IsOptional()
  @IsEnum(EstadoPropiedad)
  estado?: EstadoPropiedad;
}
