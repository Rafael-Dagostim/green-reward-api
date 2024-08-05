import PrismaService from '@core/database/connection.database.service';
import { AwardEntity } from '../domain/entities/award.entity';

export default class DeleteAwardService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(id: number): Promise<AwardEntity> {
    const award = await this.prismaService.award.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new AwardEntity(award);
  }
}
