import { ApiProperty } from '@nestjs/swagger';

export class RespuestaSolicitudContactoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'María González' })
  nombreCompleto: string;

  @ApiProperty({ example: 'maria@example.com' })
  email: string;

  @ApiProperty({ example: 'Quisiera información sobre disponibilidad.' })
  mensaje: string;

  @ApiProperty({ example: '07-01-2026 20:15:00' })
  creadoEn: Date;
}
