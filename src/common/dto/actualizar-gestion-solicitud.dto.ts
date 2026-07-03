import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { EstadoSolicitud } from '../enums/estado-solicitud.enum';

export class ActualizarGestionSolicitudDto {
  @ApiProperty({ enum: EstadoSolicitud, example: EstadoSolicitud.RESUELTA })
  @IsEnum(EstadoSolicitud)
  estado: EstadoSolicitud;

  @ApiPropertyOptional({
    example: 'Se contactó al cliente por teléfono y agendó visita.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  observacionAgente?: string | null;
}
