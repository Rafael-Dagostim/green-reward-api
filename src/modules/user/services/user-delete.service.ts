import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../domain/entities/user.entity';

export class UserDeleteService {
  constructor(private readonly prisma: PrismaClient) {}

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
