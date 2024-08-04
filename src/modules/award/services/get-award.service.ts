import { Prisma } from '@prisma/client';
import PrismaService from '@core/database/connection.database.service';
import { Injectable } from '@nestjs/common';
import { AwardEntity } from '../domain/entities/award.entity';
import { GetAwardDTO } from '../domain/dto/get-award.dto';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';

@Injectable()
export class AwardFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    dto: GetAwardDTO,
    sponsor: CorporationEntity,
  ): Promise<AwardEntity[]> {
    const where = this.createWhereFilter(sponsor);
    const orderBy = this.setColumnOrdering(dto);

    const awards = await this.prisma.award.findMany({
      where,
      orderBy,

      skip: ((dto.page ?? 1) - 1) * (dto.pageSize ?? 50),
      take: dto.pageSize ?? 50,
    });

    return awards.map((corporation) => new AwardEntity(corporation));
  }

  private createWhereFilter(
    sponsor: CorporationEntity,
  ): Prisma.AwardWhereInput {
    const where: Prisma.AwardWhereInput = {
      deletedAt: null,
    };

    if (sponsor && sponsor.legalName) {
      where.sponsorId = sponsor.id;
    }

    return where;
  }

  private setColumnOrdering(
    params: GetAwardDTO,
  ): Prisma.CorporationOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}
