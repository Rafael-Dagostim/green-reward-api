import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { AddressCreateDto } from 'src/shared/dtos/address-create.dto';

export class CorporationCreateDto {
  legalName: string;
  businessName: string;
  responsibleName: string;
  responsibleDocument: string;
  email: string;
  document: string;
  password: string;
  phone: string;
  alternativePhone: string;
  socialMedia: string;

  @IsEnum($Enums.CorporationType)
  type: $Enums.CorporationType;

  address: AddressCreateDto;
}
