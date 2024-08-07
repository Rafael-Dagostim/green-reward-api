import PrismaService from '@core/database/connection.database.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFindOneService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
    return new UserEntity(user);
  }
}
