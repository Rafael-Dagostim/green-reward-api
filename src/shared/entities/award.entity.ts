import { Award } from '@prisma/client';
import { CorporationEntity } from '../../modules/corporation/domain/entities/corporation.entity';

export class AwardEntity implements Award {
  id: number;

  link: string;
  totalCount: number;
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
