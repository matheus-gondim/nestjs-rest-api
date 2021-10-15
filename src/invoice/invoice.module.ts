import { InvoiceRepository } from './invoice.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceRepository])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
