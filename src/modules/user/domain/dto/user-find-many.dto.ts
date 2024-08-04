import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequestDto } from 'src/shared/dtos/pagination';

export class UserFindManyDto extends PaginationRequestDto {
  @IsOptional()
  @IsEnum($Enums.UserType)
  type?: $Enums.UserType;
}
