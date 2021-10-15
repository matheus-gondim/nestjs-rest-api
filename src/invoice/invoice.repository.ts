import { InvoiceUploadDto } from './dto/invoice-upload.dto';
import { Invoice } from '../db/entities/invoice.entity';
import { EntityRepository, FindConditions, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository<Invoice> {
  createInvoice(dto: InvoiceUploadDto): Promise<Invoice> {
    const { file, isPublic, userId } = dto;

    const invoice = this.create({
      name: file.filename,
      path: file.path,
      isPublic: isPublic,
      userId,
      createdAt: new Date(),
    });
    try {
      return this.save(invoice);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar o arquivo');
    }
  }

  findBy(
    findConditions: FindConditions<Invoice>,
  ): Promise<Invoice | undefined> {
    try {
      return this.findOne({ where: findConditions });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o arquivo');
    }
  }

  async findByOrFail(
    findConditions: FindConditions<Invoice>,
  ): Promise<Invoice> {
    const invoice = this.findBy(findConditions);
    if (!invoice) throw new NotFoundException('Arquivo não encontrado');
    return invoice;
  }
}
