import PrismaService from '@core/database/connection.database.service';
import { MissionCreateDto } from '../domain/dto/mission-create.dto';
import { MissionEntity } from '../domain/entities/mission.entity';
import { Injectable } from '@nestjs/common';
import { NotEnoughPointsException } from '@shared/exceptions/not-enougth-points.exception';

@Injectable()
export class MissionCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: MissionCreateDto, institutionId: number): Promise<MissionEntity> {
    const institution = await this.prisma.corporation.findUnique({
      where: { id: institutionId },
    });
    const totalMissionPoints = dto.points * dto.totalCall;

    if (institution.totalPoints < totalMissionPoints) {
      const missingPoints = totalMissionPoints - institution.totalPoints;
      throw new NotEnoughPointsException(institution.totalPoints, missingPoints);
    }

    const mission = await this.prisma.mission.create({
      data: { ...dto, institutionId: institution.id },
    });

    await this.prisma.corporation.update({
      where: { id: institutionId },
      data: { totalPoints: institution.totalPoints - totalMissionPoints },
    });

    return new MissionEntity(mission);
  }
}
