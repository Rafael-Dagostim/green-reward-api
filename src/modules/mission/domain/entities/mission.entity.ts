import { Mission } from '@prisma/client';

export class MissionEntity implements Mission {
  id: number;

  points: number;
  totalCount: number;
  name: string;
  description: string;

  institutionId: number;
  institution?: MissionEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<MissionEntity>) {
    const sponsor = partial.institution && new MissionEntity(partial.institution);

    Object.assign(this, { ...partial, sponsor });
  }
}
