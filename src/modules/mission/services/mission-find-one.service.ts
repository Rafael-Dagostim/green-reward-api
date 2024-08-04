import PrismaService from 'src/core/database/connection.database.service';
import { MissionEntity } from '../domain/entities/mission.entity';

export class MissionFindOneService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<MissionEntity> {
    const mission = await this.prisma.mission.findUnique({
      where: { id, deletedAt: null },
    });
    return new MissionEntity(mission);
  }
}
