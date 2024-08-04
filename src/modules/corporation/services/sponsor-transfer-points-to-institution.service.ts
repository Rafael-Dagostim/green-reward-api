import PrismaService from '@core/database/connection.database.service';
import { HttpException, Injectable } from '@nestjs/common';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { $Enums, Corporation } from '@prisma/client';
import PointsTransferEntity from '@shared/entities/pointsTransfer,entity';

@Injectable()
export default class SponsorTransferPointsToInstitutionService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(
    institutionId: number,
    sponsorId: number,
    points: number,
  ): Promise<{ message: string }> {
    const institution = await this.findInstitution(institutionId);
    const sponsor = await this.findSponsor(sponsorId);

    if (sponsor.totalPoints < points) {
      throw new HttpException(
        'A quantidade de pontos é superior ao limite possuído',
        409,
      );
    }
    sponsor.totalPoints -= points;
    institution.totalPoints += points;

    await this.prismaService.corporation.update({
      where: {
        id: sponsor.id,
      },
      data: sponsor as Corporation,
    });

    await this.prismaService.corporation.update({
      where: {
        id: institution.id,
        type: $Enums.CorporationType.INSTITUTION,
      },
      data: institution as Corporation,
    });
    await this.saveLogs(institutionId, sponsorId, points);
    return { message: 'Pontos transferidos com sucesso' };
  }

  private async findInstitution(id: number): Promise<CorporationEntity> {
    const institution = await this.prismaService.corporation.findFirst({
      where: {
        id,
      },
    });
    if (!institution) {
      throw new HttpException('Instituição não encontrada', 404);
    }
    return new CorporationEntity(institution);
  }

  private async findSponsor(id: number): Promise<CorporationEntity> {
    const sponsor = await this.prismaService.corporation.findFirst({
      where: {
        id,
        type: $Enums.CorporationType.SPONSOR,
      },
    });
    if (!sponsor) {
      throw new HttpException('Patrocinador não encontrada', 404);
    }
    return new CorporationEntity(sponsor);
  }

  private async saveLogs(
    institutionId: number,
    sponsorId: number,
    points: number,
  ): Promise<PointsTransferEntity> {
    const logs = new PointsTransferEntity({
      institutionId,
      points,
      sponsorId,
    });
    return await this.prismaService.pointsTransfer.create({
      data: logs,
    });
  }
}
