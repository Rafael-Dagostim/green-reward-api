import PrismaService from '@core/database/connection.database.service';
import { MissionUserEntity } from '../domain/entities/mission-user.entity';
import { FinishMissionUserDTO } from '../domain/dto/finish-mission-user.dto';
import { $Enums, MissionDetail, MissionUser, User } from '@prisma/client';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { MissionEntity } from '../domain/entities/mission.entity';
import { MissionDetailEntity } from '../domain/entities/mission-detail.entity';

@Injectable()
export default class FinishMissionUserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(id: number, user: UserEntity, dto: FinishMissionUserDTO) {
    const missionUser = await this.findMissionUser(id, user.id);
    const mission = await this.findMission(id);

    const details = new MissionDetailEntity({
      missionUserId: missionUser.id,
      description: dto.description,
    });

    if (mission.totalCall <= 0) {
      throw new HttpException('Essa missão não pode mais ser resgatada', 404);
    }

    missionUser.status = $Enums.MissionUserStatus.CONCLUDED;

    await this.prismaService.missionUser.update({
      where: {
        id: missionUser.id,
      },
      data: missionUser as MissionUser,
    });

    user.totalPoints += mission.points;
    mission.totalCall -= 1;

    await this.prismaService.pointsLog.create({
      data: {
        missionId: id,
        userId: user.id,
        points: mission.points,
      },
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user as User,
    });

    return this.prismaService.missionDetail.create({
      data: details as MissionDetail,
    });
  }

  private async findMission(id: number) {
    const mission = await this.prismaService.mission.findFirst({
      where: {
        id,
      },
    });
    if (!mission) {
      throw new HttpException('Missão não encontrado', 404);
    }
    return new MissionEntity(mission);
  }

  private async findMissionUser(id: number, userId: number): Promise<MissionUserEntity> {
    const missionUser = await this.prismaService.missionUser.findFirst({
      where: {
        missionId: id,
        userId,
      },
    });
    return new MissionUserEntity(missionUser);
  }
}
