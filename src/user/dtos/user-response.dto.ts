import { User } from '../../db/entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UserResponseDto extends OmitType(User, [
  'salt',
  'hash',
  'deletedAt',
]) {
  constructor(user: User) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
