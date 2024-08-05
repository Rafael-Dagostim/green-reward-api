import { Prisma } from '@prisma/client';
import PrismaService from '@core/database/connection.database.service';
import { CorporationFindManyDto } from '../domain/dto/corporation-find-many.dto';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorporationFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: CorporationFindManyDto): Promise<CorporationEntity[]> {
    const where = this.createWhereFilter(dto);

    const corporations = await this.prisma.corporation.findMany({
      where,
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
}
