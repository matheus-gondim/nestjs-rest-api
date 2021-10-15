import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class FindInvoicesWithPageableDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Transform((value) => parseInt(value.value))
  @ApiProperty({ name: 'page', example: 1, type: Number })
  page: number;
}
