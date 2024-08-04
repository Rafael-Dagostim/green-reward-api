import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/dtos/pagination';

export class CorporationFindManyDto extends PaginationRequestDto {
  @IsEnum($Enums.CorporationType)
  type: $Enums.CorporationType;
}
