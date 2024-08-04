import { AwardEntity } from '@modules/award/domain/entities/award.entity';
import { $Enums, Corporation } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AddressEntity } from '@shared/entities/address.entity';

export class CorporationEntity implements Corporation {
  id: number;

  responsibleName: string;
  responsibleDocument: string;
  addressId: number;
  logoId: number;
  legalName: string;
  businessName: string;
  totalPoints: number;
  email: string;
  document: string;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
  phone: string;
  alternativePhone: string;
  socialMedia: string;
  type: $Enums.CorporationType;

  awards: AwardEntity[];

  address: AddressEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<CorporationEntity>) {
    const address = partial.address && new AddressEntity(partial.address);
    Object.assign(this, { ...partial, address });
  }
}
