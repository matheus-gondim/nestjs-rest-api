import { UserResponseDto } from './../user/dto/user-response.dto';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import { User } from './../db/entities/user.entity';
import { ResponseObject } from './../common/types/response-object.type';
import { IPayload } from './jwt/payload.interface';
import { UserService } from './../user/user.service';
import { SignInDto } from './dtos/sign-in.dto';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<ResponseObject<SignInResponseDto>> {
    const user = await this.validSignIn(dto);
    const payload: IPayload = { userId: user.id };

    try {
      const token: string = this.jwtService.sign(payload);
      return {
        content: { token, user: new UserResponseDto(user) },
        message: 'Login realizado com sucesso',
      } as ResponseObject<SignInResponseDto>;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao autenticar o usuário');
    }
  }

  private async validSignIn(dto: SignInDto): Promise<User> {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);

    const isValidPassword = await this.userService.checkingPassword({
      password,
      oldHash: user.hash,
      salt: user.salt,
    });

    if (!isValidPassword)
      throw new UnauthorizedException('Credenciais inválidas');

    return user;
  }
}
