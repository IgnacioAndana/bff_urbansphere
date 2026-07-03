import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoSolicitud } from '../../../common/enums/estado-solicitud.enum';

export class RespuestaSolicitudContactoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'María González' })
  nombreCompleto: string;

  @ApiProperty({ example: 'maria@example.com' })
  email: string;

  @ApiProperty({ example: 'Quisiera información sobre disponibilidad.' })
  mensaje: string;

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

  @ApiProperty({ example: '07-01-2026 20:15:00' })
  creadoEn: Date;
}
