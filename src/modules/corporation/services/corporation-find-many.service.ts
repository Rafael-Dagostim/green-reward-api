import { Prisma } from '@prisma/client';
import PrismaService from 'src/core/database/connection.database.service';
import { CorporationFindManyDto } from '../domain/dto/corporation-find-many.dto';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorporationFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CorporationFindManyDto): Promise<CorporationEntity[]> {
    const where = this.createWhereFilter(dto);
    const orderBy = this.setColumnOrdering(dto);

    const corporations = await this.prisma.corporation.findMany({
      where,
      orderBy,

      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
    });

    return corporations.map((corporation) => new CorporationEntity(corporation));
  }

  private createWhereFilter(dto: CorporationFindManyDto): Prisma.CorporationWhereInput {
    const where: Prisma.CorporationWhereInput = {
      deletedAt: null,
    };

    if (dto.type) where.AND = { ...where.AND, type: dto.type };

    return where;
  }

  private setColumnOrdering(
    params: CorporationFindManyDto,
  ): Prisma.CorporationOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}
