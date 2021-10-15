import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmpty, IsNotEmpty } from 'class-validator';

export class InvoiceUploadDto {
  @IsNotEmpty()
  @Transform((field) => (field.value === 'true' ? true : false))
  @IsBoolean()
  @ApiProperty({ example: true })
  isPublic: boolean;

  @IsEmpty()
  file: Express.Multer.File;

  @IsEmpty()
  userId: number;
}
