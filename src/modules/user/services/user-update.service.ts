import PrismaService from '@core/database/connection.database.service';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUpdateService {
  constructor(private readonly prisma: PrismaService) {}

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
