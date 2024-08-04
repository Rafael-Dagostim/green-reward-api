import { $Enums } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { AddressCreateDto } from 'src/shared/dtos/address-create.dto';

export class UserCreateDto {
  username: string;
  document: string;
  email: string;
  password: string;
  phone: string;
  socialMedia: string;
  totalPoints: number;
  alternativePhone: string;
  birthDate: Date;

  @IsEnum($Enums.UserType)
  type: $Enums.UserType;

  address: AddressCreateDto;
}
