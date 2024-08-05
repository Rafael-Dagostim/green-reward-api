import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly page: number = 1;

  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly pageSize: number = 10;

  @IsOptional()
  @ApiProperty({ required: false })
  ordering?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @ApiProperty({ required: false })
  orderBy?: string;
}
