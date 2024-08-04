import PrismaService from 'src/core/database/connection.database.service';
import { CorporationUpdateDto } from '../domain/dto/corporation-update.dto';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorporationUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, dto: CorporationUpdateDto): Promise<CorporationEntity> {
    const { address, ...corporationData } = dto;
    const corporation = await this.prisma.corporation.update({
      where: { id },
      data: {
        ...corporationData,
        address: { update: address },
      },
    });

    return new CorporationEntity(corporation);
  }
}
