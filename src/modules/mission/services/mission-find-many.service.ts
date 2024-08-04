import { Prisma, PrismaClient } from '@prisma/client';
import { MissionEntity } from '../domain/entities/mission.entity';
import { MissionFindManyDto } from '../domain/dto/mission-find-many.dto';

export class MissionFindManyService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: MissionFindManyDto): Promise<MissionEntity[]> {
    const where = this.createWhereFilter(dto);
    const orderBy = this.setColumnOrdering(dto);

    const missions = await this.prisma.mission.findMany({
      where,
      orderBy,

      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
    });

    return missions.map((mission) => new MissionEntity(mission));
  }

  private createWhereFilter(dto: MissionFindManyDto): Prisma.MissionWhereInput {
    const where: Prisma.MissionWhereInput = {
      deletedAt: null,
    };

    if (dto.name) where.AND = { ...where.AND, name: { contains: dto.name, mode: 'insensitive' } };

    return where;
  }

  private setColumnOrdering(params: MissionFindManyDto): Prisma.MissionOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}
