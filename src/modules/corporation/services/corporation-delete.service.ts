import PrismaService from 'src/core/database/connection.database.service';
import { CorporationEntity } from '../domain/entities/corporation.entity';

export class CorporationDeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<CorporationEntity> {
    const corporation = await this.prisma.corporation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return new CorporationEntity(corporation);
  }
}
