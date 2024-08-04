import { PrismaClient } from '@prisma/client';
import { MissionEntity } from '../domain/entities/mission.entity';
import { MissionCreateDto } from '../domain/dto/mission-create.dto';

export class MissionCreateService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: MissionCreateDto): Promise<MissionEntity> {
    const mission = await this.prisma.mission.create({
      data: dto,
    });

    return new MissionEntity(mission);
  }
}
