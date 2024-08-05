import { $Enums } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class GetAwardDTO {
  @IsOptional()
  @IsEnum($Enums.CorporationType)
  type?: $Enums.CorporationType;
}
