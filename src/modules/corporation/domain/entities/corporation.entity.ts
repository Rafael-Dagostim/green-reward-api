import { $Enums, Corporation } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AwardEntity } from '@shared/entities/award.entity';

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

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<CorporationEntity>) {
    Object.assign(this, partial);
  }
}
