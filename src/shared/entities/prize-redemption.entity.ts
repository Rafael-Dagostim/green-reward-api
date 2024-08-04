import { PrizeRedemption } from '@prisma/client';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { AwardEntity } from '@modules/award/domain/entities/award.entity';

export class PrizeRedemptionEntity implements PrizeRedemption {
  id: number;

  playerId: number;
  player: UserEntity;

  awardId: number;
  award: AwardEntity;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(partial: Partial<PrizeRedemptionEntity>) {
    const player = partial.player && new UserEntity(partial.player);
    const award = partial.award && new AwardEntity(partial.award);

    Object.assign(this, { ...partial, player, award });
  }
}
