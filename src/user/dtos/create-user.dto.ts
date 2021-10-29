import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Nome deve ser uma string.' })
  @MaxLength(250, { message: 'Nome deve conter um máximo de 250 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Email inválido.' })
  @ApiProperty({ example: 'john@doe.com' })
  email: string;

  @ApiProperty({ example: 'johnDoe@99' })
  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength(6, { message: 'Senha deve conter um mínimo de 6 caracteres.' })
  @Matches(/(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  password: string;
}
