import { FindInvoicesWithPageableDto } from './dto/find-invoices-with-pageable.dto';
import { Invoice } from '../db/entities/invoice.entity';
import { InvoiceUploadDto } from './dto/invoice-upload.dto';
import { InvoiceRepository } from './invoice.repository';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async create(dto: InvoiceUploadDto): Promise<Invoice> {
    return await this.invoiceRepository.createInvoice(dto);
  }

  async getNameById(id: number): Promise<string> {
    if (!id) throw new BadRequestException();
    const invoice = await this.invoiceRepository.findByOrFail({ id });
    if (!invoice.isPublic) throw new UnauthorizedException('Arquivo privado');
    return invoice.name;
  }

  async findWithPageable(
    dto: FindInvoicesWithPageableDto,
  ): Promise<[Invoice[], number]> {
    return await this.invoiceRepository.findWithPageable(dto);
  }
}
