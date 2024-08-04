import { Mission } from '@prisma/client';
import { CorporationEntity } from './corporation.entity';

export class MissionEntity implements Mission {
  id: number;

  points: number;
  totalCount: number;
  name: string;
  description: string;

  institutionId: number;
  institution?: CorporationEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<MissionEntity>) {
    const sponsor = partial.institution && new CorporationEntity(partial.institution);

    Object.assign(this, { ...partial, sponsor });
  }
}
