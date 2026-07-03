import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EstadoProyecto } from '../../../common/enums/estado-proyecto.enum';
import { TipoProyecto } from '../../../common/enums/tipo-proyecto.enum';

export class ActualizarProyectoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  titulo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  direccion?: string;

  @ApiPropertyOptional({ example: 'Providencia' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  comuna?: string;

  @ApiPropertyOptional({ enum: TipoProyecto })
  @IsOptional()
  @IsEnum(TipoProyecto)
  tipo?: TipoProyecto;

  @ApiPropertyOptional({ example: '2027-12-31' })
  @IsOptional()
  @IsDateString()
  fechaEntregaEstimada?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  latitud?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  longitud?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  descripcion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ enum: EstadoProyecto })
  @IsOptional()
  @IsEnum(EstadoProyecto)
  estado?: EstadoProyecto;
}
