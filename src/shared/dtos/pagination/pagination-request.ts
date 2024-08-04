import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly page: number = 1;

  @IsDefined()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly pageSize: number = 10;

  @IsOptional()
  ordering?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  orderBy?: string;
}
