import PrismaService from '@core/database/connection.database.service';
import { HttpException, Injectable } from '@nestjs/common';
import { $Enums, MissionUser } from '@prisma/client';
import { MissionUserEntity } from '../domain/entities/mission-user.entity';

@Injectable()
export default class PickMissionUserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(id: number, userId: number): Promise<MissionUser> {
    const mission = await this.findMission(id);
    await this.countUserMission(id, userId);
    const data = await this.prismaService.missionUser.create({
      data: {
        status: $Enums.MissionUserStatus.PENDING,
        missionId: mission.id,
        userId: userId,
      },
    });
    return new MissionUserEntity(data);
  }

  private async findMission(id: number) {
    const mission = await this.prismaService.mission.findFirst({
      where: {
        id,
      },
    });
    if (!mission) {
      throw new HttpException('Missão não encontrada', 404);
    }
    return mission;
  }

  private async countUserMission(id: number, userId: number) {
    const countUserMission = await this.prismaService.missionUser.count({
      where: {
        missionId: id,
        userId,
        status: $Enums.MissionUserStatus.PENDING,
      },
    });
    if (countUserMission + 1 >= 5) {
      throw new HttpException(
        'O usuário não pode mais pegar missões, conclua a que você possui',
        404,
      );
    }
  }
}
