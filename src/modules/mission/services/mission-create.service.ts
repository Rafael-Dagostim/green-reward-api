import PrismaService from 'src/core/database/connection.database.service';
import { MissionCreateDto } from '../domain/dto/mission-create.dto';
import { MissionEntity } from '../domain/entities/mission.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: MissionCreateDto): Promise<MissionEntity> {
    const mission = await this.prisma.mission.create({
      data: dto,
    });

    return new MissionEntity(mission);
  }
}
