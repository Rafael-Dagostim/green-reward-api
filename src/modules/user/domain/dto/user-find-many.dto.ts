import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UserFindManyDto {
  @IsOptional()
  @IsEnum($Enums.UserType)
  type?: $Enums.UserType;
}
