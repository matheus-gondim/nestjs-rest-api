import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncrypterService {
  async generateSalt(): Promise<string> {
    try {
      return await bcrypt.genSalt();
    } catch (error) {
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  async hashPassword(data: {
    password: string;
    salt: string;
  }): Promise<string> {
    const { salt, password } = data;

    try {
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw new InternalServerErrorException('Erro interno do servidor');
    }
  }

  async generateSaltAndHash(password: string) {
    const salt = await this.generateSalt();
    const hash = await this.hashPassword({ password, salt });
    return { salt, hash };
  }
}
