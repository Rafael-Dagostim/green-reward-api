import { Prisma } from '@prisma/client';
import PrismaService from '@core/database/connection.database.service';
import { Injectable } from '@nestjs/common';
import { AwardEntity } from '../domain/entities/award.entity';
import { GetAwardDTO } from '../domain/dto/get-award.dto';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';

@Injectable()
export class AwardFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: GetAwardDTO, sponsor: CorporationEntity): Promise<AwardEntity[]> {
    const where = this.createWhereFilter(sponsor);

    const awards = await this.prisma.award.findMany({
      where,
    });

    return awards.map((corporation) => new AwardEntity(corporation));
  }

  private createWhereFilter(sponsor: CorporationEntity): Prisma.AwardWhereInput {
    const where: Prisma.AwardWhereInput = {
      deletedAt: null,
    };

    if (sponsor && sponsor.legalName) {
      where.sponsorId = sponsor.id;
    }

    return where;
  }
}
