import { InternalServerErrorException } from '@nestjs/common';
import { EncrypterService } from '../../src/encrypter/encrypter.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

describe('Encrypter service', () => {
  let encrypterService: EncrypterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncrypterService],
    }).compile();

    encrypterService = module.get<EncrypterService>(EncrypterService);
  });

  it('should generate valid a salt and hash when a password is entered', async () => {
    const result = await encrypterService.generateSaltAndHash('senhaTeste');

    expect(result.salt).toBeDefined();
    expect(result.hash).toBeDefined();

    expect(result.salt.length).toBeGreaterThan(1);
    expect(result.hash.length).toBeGreaterThan(result.salt.length + 1);

    expect(result.hash).toContain(result.salt);
  });

  it("should internal server error when the bcrypt's genSalt function return error", async () => {
    (bcrypt as any).genSalt = jest.fn().mockRejectedValue({});
    expect(encrypterService.generateSalt()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it("should internal server error when the bcrypt's hash function return error", async () => {
    (bcrypt as any).hash = jest.fn().mockRejectedValue({});
    expect(
      encrypterService.hashPassword({ password: 'senhaTeste', salt: '' }),
    ).rejects.toThrow(InternalServerErrorException);
  });
});
