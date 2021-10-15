import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EncrypterModule } from 'src/encrypter/encrypter.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), EncrypterModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
