import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CrearSolicitudInteresDto {
  @ApiProperty({ example: 12, description: 'ID del proyecto de interés (proyectos.id)' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  proyectoId: number;
}
