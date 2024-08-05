import { MissionDetail, MissionUser } from '@prisma/client';
import { StoredFileEntity } from '../../../../shared/entities/stored-files.entity';
import { MissionUserEntity } from './mission-user.entity';

export class MissionDetailEntity implements MissionDetail {
  id: number;

  description: string;

  fileId: number;
  file: StoredFileEntity;

  missionUserId: number;
  missionUser: MissionUser;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<MissionDetailEntity>) {
    const file = partial.file && new StoredFileEntity(partial.file);
    const missionUser =
      partial.missionUser && new MissionUserEntity(partial.missionUser);

    Object.assign(this, { ...partial, mission: file, user: missionUser });
  }
}
