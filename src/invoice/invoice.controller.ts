import { FindInvoicesWithPageableDto } from './dtos/find-invoices-with-pageable.dto';
import { ResponseObject } from './../common/types/response-object.type';
import { Invoice } from '../db/entities/invoice.entity';
import { InvoiceUploadDto } from './dtos/invoice-upload.dto';
import { InvoiceService } from './invoice.service';
import { CurrentUser } from './../user/decorators/current-user.decorator';
import { multerConfig } from './../config/multer.config';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { createReadStream } from 'fs';

@Controller('invoice')
@ApiBearerAuth()
@ApiTags('Notas')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        isPublic: { type: 'boolean', example: true },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: InvoiceUploadDto,
    @CurrentUser() userId: number,
  ): Promise<ResponseObject<Invoice>> {
    const invoice = await this.invoiceService.create({ ...dto, file, userId });

    return {
      content: invoice,
      message: 'Arquivo criado com sucesso',
    } as ResponseObject<Invoice>;
  }

  @Public()
  @Get()
  async findUsers(@Query() dto: FindInvoicesWithPageableDto) {
    const [invoice, count] = await this.invoiceService.findWithPageable(dto);
    return {
      content: invoice,
      message: 'Arquivos encontrados com sucesso',
      total: count,
    } as ResponseObject<Invoice[]>;
  }

  @Public()
  @Get(':id')
  async getImage(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: any,
  ): Promise<void> {
    const fileName = await this.invoiceService.getNameById(id);
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    const file = createReadStream(`./uploads/${fileName}`);
    file.pipe(res);
  }
}
