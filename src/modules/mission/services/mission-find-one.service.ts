import PrismaService from '@core/database/connection.database.service';
import { MissionEntity } from '../domain/entities/mission.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionFindOneService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<MissionEntity> {
    const mission = await this.prisma.mission.findUnique({
      where: { id, deletedAt: null },
      include: { tags: true },
    });
    return new MissionEntity(mission, mission.tags);
  }
}
