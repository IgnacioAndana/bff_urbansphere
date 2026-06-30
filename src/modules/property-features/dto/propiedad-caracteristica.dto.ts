import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearPropiedadCaracteristicaDto {
  @ApiProperty({ example: 'Estacionamiento' })
  @IsString()
  @IsNotEmpty()
  nombreCaracteristica: string;

  @ApiProperty({ example: '2 vehículos' })
  @IsString()
  @IsNotEmpty()
  valorCaracteristica: string;
}

export class ActualizarPropiedadCaracteristicaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nombreCaracteristica?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  valorCaracteristica?: string;
}
