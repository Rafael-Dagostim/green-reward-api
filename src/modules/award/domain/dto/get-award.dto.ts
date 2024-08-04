import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequestDto } from '@shared/dtos/pagination';

export class GetAwardDTO extends PaginationRequestDto {
  @IsOptional()
  @IsEnum($Enums.CorporationType)
  type?: $Enums.CorporationType;
}
