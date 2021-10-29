import { BadRequestException } from '@nestjs/common';
import { SALT_AND_HASH_MOCK } from './../encrypter/mocks/salt-and-hash.mock';
import { EncrypterService } from '../../src/encrypter/encrypter.service';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CREATE_USER_DTO_MOCK, CREATE_USER_MOCK, USER_MOCK } from './mocks';

describe('User service', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let encrypterService: EncrypterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn().mockResolvedValue(USER_MOCK),
            findByOrFail: jest.fn().mockResolvedValue(USER_MOCK),
          },
        },
        {
          provide: EncrypterService,
          useValue: {
            generateSaltAndHash: jest
              .fn()
              .mockResolvedValue(SALT_AND_HASH_MOCK),
            hashPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    encrypterService = module.get<EncrypterService>(EncrypterService);

    userService = new UserService(userRepository, encrypterService);
  });

  it('should return a user object when the createUser function is call', async () => {
    const result = await userService.create(CREATE_USER_DTO_MOCK);
    expect(userRepository.createUser).toBeCalledWith(CREATE_USER_MOCK);
    expect(result).toEqual(USER_MOCK);
  });

  it('should return a user object when the findByOrFail function is call with a user id', async () => {
    const result = await userService.findById(1);
    expect(userRepository.findByOrFail).toBeCalledWith({ id: 1 });
    expect(result).toEqual(USER_MOCK);
  });

  it('should throw bad request exception when user id is null', async () => {
    expect(userService.findById(undefined)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return a user object when the findByOrFail function is call with a user email', async () => {
    const result = await userService.findByEmail('john@doe.com');
    expect(userRepository.findByOrFail).toBeCalledWith({
      email: 'john@doe.com',
    });
    expect(result).toEqual(USER_MOCK);
  });

  it('should throw bad request exception when user email is null', async () => {
    await expect(userService.findByEmail('')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return false when passwords are different', async () => {
    const MOCK = {
      oldHash: USER_MOCK.hash,
      salt: USER_MOCK.salt,
      password: 'johnDoe@99',
    };
    const result = await userService.checkingPassword(MOCK);
    expect(encrypterService.hashPassword).toBeCalledWith({
      password: MOCK.password,
      salt: MOCK.salt,
    });

    expect(result).toBeDefined();
    expect(typeof result).toEqual('boolean');
  });
});
