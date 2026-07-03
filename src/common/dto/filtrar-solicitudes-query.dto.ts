import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoSolicitud } from '../enums/estado-solicitud.enum';

export class FiltrarSolicitudesQueryDto {
  @ApiPropertyOptional({
    enum: EstadoSolicitud,
    description: 'Filtrar por estado (panel admin: pendientes / resueltas)',
  })
  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud;
}
