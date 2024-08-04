import { Prisma, PrismaClient } from '@prisma/client';
import { UserEntity } from '../domain/entities/user.entity';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';

export class UserFindManyService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: UserFindManyDto): Promise<UserEntity[]> {
    const where = this.createWhereFilter(dto);
    const orderBy = this.setColumnOrdering(dto);

    const users = await this.prisma.user.findMany({
      where,
      orderBy,

      skip: (dto.page - 1) * dto.pageSize,
      take: dto.pageSize,
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

  private setColumnOrdering(params: UserFindManyDto): Prisma.UserOrderByWithRelationInput {
    if (!params.orderBy) return { id: params.ordering };
    return { [params.orderBy]: params.ordering };
  }
}
