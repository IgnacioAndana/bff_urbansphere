import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ActualizarProyectoEquipamientoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  gimnasio?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  quincho?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  areasVerdes?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  bicicletero?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  piscina?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  juegosInfantiles?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  gourmetLounge?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  coworkingRoom?: boolean;
}
