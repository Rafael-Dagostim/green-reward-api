import { Mission, MissionTag } from '@prisma/client';

export class MissionEntity implements Mission {
  id: number;

  points: number;
  totalCall: number;
  name: string;
  description: string;

  institutionId: number;
  institution?: MissionEntity;

  tags: string[];

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<Omit<MissionEntity, 'tags'>>, missionTags?: MissionTag[]) {
    const sponsor = partial.institution && new MissionEntity(partial.institution);
    const tags = missionTags.map((tag) => tag.tag);

    Object.assign(this, { ...partial, sponsor, tags });
  }
}
