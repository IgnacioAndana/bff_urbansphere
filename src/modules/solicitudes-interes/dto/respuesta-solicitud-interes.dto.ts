import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoSolicitud } from '../../../common/enums/estado-solicitud.enum';

export class RespuestaSolicitudInteresDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  proyectoId: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ nullable: true })
  usuarioId: number | null;

  @ApiProperty({ enum: EstadoSolicitud, example: EstadoSolicitud.PENDIENTE })
  estado: EstadoSolicitud;

  @ApiPropertyOptional({ nullable: true })
  observacionAgente: string | null;

  @ApiProperty({ example: '20-06-2025 14:30:45' })
  creadoEn: Date;
}
