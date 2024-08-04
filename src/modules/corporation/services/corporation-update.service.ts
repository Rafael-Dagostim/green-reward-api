import PrismaService from '@core/database/connection.database.service';
import { Injectable } from '@nestjs/common';
import { Corporation } from '@prisma/client';
import { CorporationUpdateDto } from '../domain/dto/corporation-update.dto';
import { CorporationEntity } from '../domain/entities/corporation.entity';

@Injectable()
export class CorporationUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: Corporation, dto: CorporationUpdateDto): Promise<CorporationEntity> {
    const { address, ...corporationData } = dto;
    const corporation = await this.prisma.corporation.update({
      where: { id: user.id },
      data: {
        ...corporationData,
        address: { update: address },
      },
    });

    return new CorporationEntity(corporation);
  }
}
