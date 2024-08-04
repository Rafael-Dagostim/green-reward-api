import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/dtos/pagination';

export class UserFindManyDto extends PaginationRequestDto {
  @IsEnum($Enums.UserType)
  type: $Enums.UserType;
}
