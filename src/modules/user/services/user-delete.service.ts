import PrismaService from 'src/core/database/connection.database.service';
import { UserEntity } from '../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDeleteService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return new UserEntity(user);
  }
}
