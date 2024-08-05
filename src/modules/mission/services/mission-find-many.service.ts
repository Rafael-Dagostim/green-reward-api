import PrismaService from '@core/database/connection.database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MissionFindManyDto } from '../domain/dto/mission-find-many.dto';
import { MissionEntity } from '../domain/entities/mission.entity';

@Injectable()
export class MissionFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto?: MissionFindManyDto): Promise<MissionEntity[]> {
    const where = this.createWhereFilter(dto);

    const missions = await this.prisma.mission.findMany({
      where,
      include: { tags: true },
    });

    return missions.map((mission) => new MissionEntity(mission, mission.tags));
  }

  private createWhereFilter(dto: MissionFindManyDto): Prisma.MissionWhereInput {
    const where: Prisma.MissionWhereInput = {
      deletedAt: null,
    };

    if (dto.name) where.AND = { ...where.AND, name: { contains: dto.name, mode: 'insensitive' } };

    return where;
  }
}
