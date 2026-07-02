import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearSolicitudContactoDto {
  @ApiProperty({ example: 'María González' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  nombreCompleto: string;

  @ApiProperty({ example: 'maria@example.com' })
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({
    example: 'Quisiera información sobre disponibilidad y valores de reserva.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(5000)
  mensaje: string;
}
