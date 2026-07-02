import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CrearTipologiaDto {
  @ApiProperty({ example: '2D2B-64' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigoTipologia: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(0)
  dormitorios: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(0)
  banos: number;

  @ApiProperty({ example: 64.5 })
  @IsNumber()
  @Min(0)
  superficieM2: number;

  @ApiProperty({ example: 3200, description: 'Valor en UF' })
  @IsNumber()
  @Min(0)
  valorEnUf: number;
}

export class ActualizarTipologiaDto {
  @ApiPropertyOptional({ example: '2D2B-75' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigoTipologia?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  dormitorios?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  banos?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  superficieM2?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  valorEnUf?: number;
}
