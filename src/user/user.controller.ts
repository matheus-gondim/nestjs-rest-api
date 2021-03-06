import { CurrentUser } from './decorators/current-user.decorator';
import { UserResponseDto } from './dtos/user-response.dto';
import { ResponseObject } from './../common/types/response-object.type';
import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
@ApiTags('Usuários')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(
    @Body() dto: CreateUserDto,
  ): Promise<ResponseObject<UserResponseDto>> {
    const user = await this.userService.create(dto);
    return {
      content: new UserResponseDto(user),
      message: 'Usuário criado com sucesso.',
    } as ResponseObject<UserResponseDto>;
  }

  @Get('/current')
  async findCurrentUser(
    @CurrentUser() id: number,
  ): Promise<ResponseObject<UserResponseDto>> {
    const user = await this.userService.findById(id);
    return {
      content: new UserResponseDto(user),
      message: 'Usuário encontrado com sucesso',
    } as ResponseObject<UserResponseDto>;
  }
}
