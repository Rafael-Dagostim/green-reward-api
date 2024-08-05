import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class CorporationFindManyDto {
  @IsOptional()
  @IsEnum($Enums.CorporationType)
  type?: $Enums.CorporationType;
}
