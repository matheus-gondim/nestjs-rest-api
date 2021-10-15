import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class SignInDto {
  @ApiProperty({ example: 'john@doe.com' })
  @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
  email: string;

  @ApiProperty({ example: 'johnDoe@99' })
  @IsNotEmpty({ message: 'Senha obrigatória' })
  password: string;
}
