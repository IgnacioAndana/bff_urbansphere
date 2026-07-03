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

  @ApiPropertyOptional({
    example: '03-07-2026 18:30:00',
    nullable: true,
    description: 'Fecha en que se marcó como resuelta (null si pendiente)',
  })
  fechaResolucion: Date | null;

  @ApiProperty({ example: '20-06-2025 14:30:45' })
  creadoEn: Date;
}
