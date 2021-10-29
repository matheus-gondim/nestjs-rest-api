import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { USER_MOCK } from './mocks/user.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './../../src/user/user.repository';
import { CREATE_USER_MOCK } from './mocks';

describe('User repository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);

    userRepository.save = jest.fn().mockResolvedValue(USER_MOCK);
    userRepository.findOne = jest.fn().mockResolvedValue(USER_MOCK);
  });

  it('should call the save function and return a user when the object is valid', async () => {
    const result = await userRepository.createUser(CREATE_USER_MOCK);
    expect(userRepository.save).toHaveBeenCalled();
    expect(result).toEqual(USER_MOCK);
  });

  it('should throw an internal server error when an error occurred saving a user', async () => {
    userRepository.save = jest.fn().mockRejectedValue({ code: 0 });
    await expect(userRepository.createUser(CREATE_USER_MOCK)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw an conflict exception when the email is already registered', async () => {
    userRepository.save = jest.fn().mockRejectedValue({ code: 23505 });
    await expect(userRepository.createUser(CREATE_USER_MOCK)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call the findOne function and return a user when a search parameter is passed', async () => {
    const result = await userRepository.findBy({ id: 1 });
    expect(userRepository.findOne).toBeCalledWith({ where: { id: 1 } });
    expect(result).toEqual(USER_MOCK);
  });

  it('should throw an internal server error when an error occurred fetching a user', async () => {
    userRepository.findOne = jest.fn().mockRejectedValue({});
    await expect(userRepository.findBy({ id: 1 })).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should call the findByOrFail function and return a user when a search parameter is passed.', async () => {
    userRepository.findBy = jest.fn().mockResolvedValue(USER_MOCK);
    const result = await userRepository.findByOrFail({ id: 1 });
    expect(userRepository.findBy).toBeCalledWith({ id: 1 });
    expect(result).toEqual(USER_MOCK);
  });

  it("should throw an not found exception when can't find the user", async () => {
    userRepository.findBy = jest.fn().mockResolvedValue(undefined);
    await expect(userRepository.findByOrFail({ id: 1 })).rejects.toThrow(
      NotFoundException,
    );
  });
});
