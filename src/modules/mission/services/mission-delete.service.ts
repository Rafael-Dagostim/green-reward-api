import PrismaService from 'src/core/database/connection.database.service';
import { MissionEntity } from '../domain/entities/mission.entity';

export class MissionDeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<MissionEntity> {
    const mission = await this.prisma.mission.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return new MissionEntity(mission);
  }
}
