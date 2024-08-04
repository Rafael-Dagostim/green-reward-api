import PrismaService from '@core/database/connection.database.service';
import { SponsorCreateAwardDTO } from '../domain/dto/sponsor-create-award.dto';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { AwardEntity } from '@shared/entities/award.entity';
import { Award } from '@prisma/client';

@Injectable()
export default class SponsorCreateAwardService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  public async execute(dto: SponsorCreateAwardDTO): Promise<AwardEntity> {
    const points = this.calcPoints(dto.priceValueUnit, dto.totalCounts);
    const sponsor = await this.findSponsor(dto.sponsorId);
    const data = await this.prismaService.award.create({
      data: this.serializeAward(dto, points.unit) as Award,
    });

    await this.prismaService.corporation.update({
      where: {
        id: sponsor.id,
      },
      data: {
        totalPoints: sponsor.totalPoints + points.total,
      },
    });

    return new AwardEntity(data);
  }

  private async findSponsor(id: number): Promise<CorporationEntity> {
    const sponsor = await this.prismaService.corporation.findFirstOrThrow({
      where: {
        id,
      },
    });
    if (!sponsor) {
      throw new HttpException('Patrocinador não encontrado', 404);
    }
    return new CorporationEntity(sponsor);
  }

  private serializeAward(
    dto: SponsorCreateAwardDTO,
    points: number,
  ): AwardEntity {
    return new AwardEntity({
      link: dto.link,
      name: dto.name,
      description: dto.description,
      pricePoints: points,
      priceValue: dto.priceValueUnit,
      sponsorId: dto.sponsorId,
      totalCount: dto.totalCounts,
    });
  }

  private calcPoints(
    valueUnit: number,
    count: number,
  ): { unit: number; total: number } {
    const valuePointsByBRL = this.configService.getOrThrow<number>(
      'POINT_VALUE_PEER_BRL',
    );
    const valueInPoints = valueUnit / valuePointsByBRL;
    return {
      unit: Math.round(valueInPoints),
      total: valueInPoints * count,
    };
  }
}
