import { User } from 'src/db/entities/user.entity';

export const CREATE_USER_MOCK = {
  email: 'john@doe.com',
  hash: '$2b$10$4Mir4Bx4GOTRzcl5sqbKa.ckrCkZd9n28xy1t1K14r.DT8CA0rhKG',
  name: 'John Doe',
  salt: '$2b$10$4Mir4Bx4GOTRzcl5sqbKa.',
} as User;
