import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/dtos/pagination';

export class CorporationFindManyDto extends PaginationRequestDto {
  @IsOptional()
  @IsEnum($Enums.CorporationType)
  type?: $Enums.CorporationType;
}
