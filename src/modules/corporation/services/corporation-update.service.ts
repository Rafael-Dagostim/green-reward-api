import { PrismaClient } from '@prisma/client';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { CorporationUpdateDto } from '../domain/dto/corporation-update.dto';

export class CorporationUpdateService {
  constructor(private readonly prisma: PrismaClient) {}

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
