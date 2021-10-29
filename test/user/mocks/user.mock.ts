import { User } from './../../../src/db/entities/user.entity';

export const USER_MOCK = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  salt: '$2b$10$4Mir4Bx4GOTRzcl5sqbKa.',
  hash: '$2b$10$4Mir4Bx4GOTRzcl5sqbKa.ckrCkZd9n28xy1t1K14r.DT8CA0rhKG',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  //   files: [] as Invoice[],
} as User;
