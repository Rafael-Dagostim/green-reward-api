import PrismaService from '@core/database/connection.database.service';
import { HttpException } from '@nestjs/common';
import { AwardEntity } from '../domain/entities/award.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Award, PrizeRedemption, User } from '@prisma/client';
import { PrizeRedemptionEntity } from '@shared/entities/prize-redemption.entity';

export default class RescueAwardService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(
    awardId: number,
    userId: number,
  ): Promise<{ link: string }> {
    const award = await this.findAward(awardId);
    const user = await this.findUser(userId);

    if (award.pricePoints > user.totalPoints) {
      throw new HttpException(
        'O usuário não possui a quantidade de pontos necessários',
        409,
      );
    }

    if (award.totalCount <= 0) {
      throw new HttpException('A premiação não pode mais ser resgatada', 409);
    }

    user.totalPoints -= award.pricePoints;
    award.totalCount -= 1;

    await this.prismaService.award.update({
      where: {
        id: award.id,
      },
      data: award as Award,
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user as User,
    });

    await this.saveLogs(awardId, userId);

    return {
      link: award.link,
    };
  }

  private async findAward(id: number): Promise<AwardEntity> {
    const award = await this.prismaService.award.findFirst({
      where: {
        id,
      },
    });
    if (!award) {
      throw new HttpException('Premiação não encontrada', 404);
    }
    return new AwardEntity(award);
  }

  private async findUser(id: number): Promise<UserEntity> {
    const player = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
    if (!player) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return new UserEntity(player);
  }

  private async saveLogs(
    awardId: number,
    userId: number,
  ): Promise<PrizeRedemptionEntity> {
    const prizeRedemption = new PrizeRedemptionEntity({
      awardId,
      playerId: userId,
    });
    const data = await this.prismaService.prizeRedemption.create({
      data: prizeRedemption as PrizeRedemption,
    });
    return new PrizeRedemptionEntity(data);
  }
}
