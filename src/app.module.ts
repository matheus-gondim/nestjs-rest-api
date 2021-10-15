import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { EncrypterModule } from './encrypter/encrypter.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE || 'dev'}`,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    UserModule,
    EncrypterModule,
    AuthModule,
    InvoiceModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
