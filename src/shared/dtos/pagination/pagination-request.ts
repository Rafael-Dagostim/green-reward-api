import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty()
  readonly page: number = 1;

  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiProperty()
  readonly pageSize: number = 10;

  @IsOptional()
  @ApiProperty()
  ordering?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @ApiProperty()
  orderBy?: string;
}
