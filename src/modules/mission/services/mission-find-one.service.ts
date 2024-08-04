import { PrismaClient } from '@prisma/client';
import { MissionEntity } from '../domain/entities/mission.entity';

export class MissionFindOneService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: number): Promise<MissionEntity> {
    const mission = await this.prisma.mission.findUnique({
      where: { id, deletedAt: null },
    });
    return new MissionEntity(mission);
  }
}
