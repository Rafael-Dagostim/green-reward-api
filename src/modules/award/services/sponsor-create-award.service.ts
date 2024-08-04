import PrismaService from '@core/database/connection.database.service';
import { AwardCreateDto } from '../domain/dto/award-create.dto';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';
import { CorporationEntity } from '../../corporation/domain/entities/corporation.entity';
import { Award } from '@prisma/client';
import { AwardEntity } from '@modules/award/domain/entities/award.entity';

@Injectable()
export default class SponsorCreateAwardService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  public async execute(
    dto: AwardCreateDto,
    sponsor: CorporationEntity,
  ): Promise<AwardEntity> {
    const points = this.calcPoints(dto.unitPrice, dto.quantity);
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

  private serializeAward(dto: AwardCreateDto, points: number): AwardEntity {
    return new AwardEntity({
      link: dto.link,
      name: dto.name,
      description: dto.description,
      pricePoints: points,
      priceValue: dto.unitPrice,
      redeemQuantity: dto.quantity,
    });
  }

  private calcPoints(
    valueUnit: number,
    count: number,
  ): { unit: number; total: number } {
    const valuePointsByBRL = this.configService.getOrThrow<number>(
      'POINT_VALUE_PER_BRL',
    );
    const valueInPoints = valueUnit / valuePointsByBRL;
    return {
      unit: Math.round(valueInPoints),
      total: valueInPoints * count,
    };
  }
}
