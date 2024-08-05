import PrismaService from '@core/database/connection.database.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';

@Injectable()
export class UserFindManyService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(dto: UserFindManyDto): Promise<UserEntity[]> {
    const where = this.createWhereFilter(dto);

    const users = await this.prisma.user.findMany({
      where,
    });

    return users.map((user) => new UserEntity(user));
  }

  private createWhereFilter(dto: UserFindManyDto): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
    };

    if (dto.type) where.AND = { ...where.AND, type: dto.type };

    return where;
  }
}
