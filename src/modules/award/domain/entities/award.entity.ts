import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { Award } from '@prisma/client';

export class AwardEntity implements Award {
  id: number;

  link: string;
  name: string;
  description: string;
  redeemQuantity: number;
  priceValue: number;
  pricePoints: number;

  sponsorId: number;
  sponsor?: CorporationEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<AwardEntity>) {
    const sponsor = partial.sponsor && new CorporationEntity(partial.sponsor);

    Object.assign(this, { ...partial, sponsor });
  }
}
