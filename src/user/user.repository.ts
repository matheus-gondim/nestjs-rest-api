import { User } from './../db/entities/user.entity';
import { Repository, EntityRepository, FindConditions } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: User): Promise<User> {
    try {
      return await this.save({ ...user, createdAt: new Date() });
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      }
      throw new InternalServerErrorException('Erro ao salvar o usuário');
    }
  }

  async findBy(findConditions: FindConditions<User>) {
    try {
      return await this.findOne({ where: findConditions });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário');
    }
  }

  async findByOrFail(findConditions: FindConditions<User>): Promise<User> {
    const findUser = await this.findBy(findConditions);
    if (!findUser) throw new NotFoundException('Usuário não encontrado');
    return findUser;
  }
}
