import PrismaService from '@core/database/connection.database.service';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorporationFindOneService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<CorporationEntity> {
    const corporation = await this.prisma.corporation.findUnique({
      where: { id, deletedAt: null },
    });
    return new CorporationEntity(corporation);
  }
}
