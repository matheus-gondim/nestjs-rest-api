import { Module } from '@nestjs/common';
import { EncrypterService } from './encrypter.service';

@Module({
  providers: [EncrypterService],
  exports: [EncrypterService],
})
export class EncrypterModule {}
