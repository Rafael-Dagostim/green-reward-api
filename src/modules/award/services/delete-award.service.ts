import PrismaService from '@core/database/connection.database.service';

export default class DeleteAwardService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async execute(id: number) {
    return await this.prismaService.award.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
