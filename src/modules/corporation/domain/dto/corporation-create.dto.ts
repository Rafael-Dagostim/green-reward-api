import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { AddressCreateDto } from '@shared/dtos/address-create.dto';

export class CorporationCreateDto {
  @ApiProperty({ description: 'Razão social' })
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
