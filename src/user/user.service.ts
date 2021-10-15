import { CreateUserDto } from './dto/create-user.dto';
import { User } from './../db/entities/user.entity';
import { EncrypterService } from './../encrypter/encrypter.service';
import { UserRepository } from './user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypterService: EncrypterService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { password, email, name } = dto;
    const saltAndHash = await this.encrypterService.generateSaltAndHash(
      password,
    );
    const user = { ...saltAndHash, email, name } as User;
    return await this.userRepository.createUser(user);
  }

  async findById(id: number): Promise<User> {
    if (!id)
      throw new BadRequestException('Id é obrigatório para buscar o usuário');

    const findUser = await this.userRepository.findByOrFail({ id });
    return findUser;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email)
      throw new BadRequestException(
        'Email é obrigatório para buscar o usuário',
      );

    const findUser = await this.userRepository.findByOrFail({ email });
    return findUser;
  }

  async checkingPassword(data: {
    oldHash: string;
    password: string;
    salt: string;
  }): Promise<boolean> {
    const { salt, password, oldHash } = data;
    const hash = await this.encrypterService.hashPassword({ password, salt });
    return oldHash === hash;
  }
}
