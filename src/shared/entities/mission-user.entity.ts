import { $Enums, MissionUser } from '@prisma/client';
import { MissionEntity } from './mission.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class MissionUserEntity implements MissionUser {
  id: number;

  status: $Enums.MissionUserStatus;

  missionId: number;
  mission: MissionEntity;

  userId: number;
  user: UserEntity;

  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<MissionUserEntity>) {
    const mission = partial.mission && new MissionEntity(partial.mission);
    const user = partial.user && new UserEntity(partial.user);

    Object.assign(this, { ...partial, mission, user });
  }
}
