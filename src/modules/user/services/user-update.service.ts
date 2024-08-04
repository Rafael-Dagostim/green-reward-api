import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../domain/entities/user.entity';
import { UserUpdateDto } from '../domain/dto/user-update.dto';

export class UserUpdateService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(id: number, dto: UserUpdateDto): Promise<UserEntity> {
    const { address, ...userData } = dto;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        address: { update: address },
      },
    });

    return new UserEntity(user);
  }
}
