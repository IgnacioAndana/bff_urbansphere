import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstadoTourVirtual } from '../../../common/enums/estado-tour-virtual.enum';

export class CrearTourVirtualDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  urlTour?: string;

  @ApiPropertyOptional({ enum: EstadoTourVirtual })
  @IsOptional()
  @IsEnum(EstadoTourVirtual)
  estado?: EstadoTourVirtual;
}

export class ActualizarTourVirtualDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  urlTour?: string;

  @ApiPropertyOptional({ enum: EstadoTourVirtual })
  @IsOptional()
  @IsEnum(EstadoTourVirtual)
  estado?: EstadoTourVirtual;
}
