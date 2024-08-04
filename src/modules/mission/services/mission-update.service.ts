import PrismaService from '@core/database/connection.database.service';
import { MissionEntity } from '../../mission/domain/entities/mission.entity';
import { MissionUpdateDto } from '../domain/dto/mission-update.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, dto: MissionUpdateDto): Promise<MissionEntity> {
    const mission = await this.prisma.mission.update({
      where: { id },
      data: dto,
    });

    return new MissionEntity(mission);
  }
}
