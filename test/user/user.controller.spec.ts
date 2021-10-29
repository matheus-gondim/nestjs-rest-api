import { USER_MOCK } from './mocks/user.mock';
import { CREATE_USER_DTO_MOCK } from './mocks/create-user-dto.mock';
import { UserService } from '../../src/user/user.service';
import { UserController } from '../../src/user/user.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('User controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(USER_MOCK),
            findById: jest.fn().mockResolvedValue(USER_MOCK),
          },
        },
      ],
    }).compile();

    userController = new UserController(module.get<UserService>(UserService));
  });

  it('should call the create function', async () => {
    await expect(
      userController.create(CREATE_USER_DTO_MOCK),
    ).resolves.not.toThrow();
  });

  it('should call the findCurrentUser function', async () => {
    await expect(userController.findCurrentUser(1)).resolves.not.toThrow();
  });
});
