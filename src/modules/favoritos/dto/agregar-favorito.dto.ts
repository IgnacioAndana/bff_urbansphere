import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AgregarFavoritoDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto (proyectos.id)' })
  @IsInt()
  @IsPositive()
  proyectoId: number;
}
