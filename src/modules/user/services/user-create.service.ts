import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../domain/entities/user.entity';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { genSalt, hash } from 'bcrypt';

export class UserCreateService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: UserCreateDto): Promise<UserEntity> {
    const { address, password, ...userData } = dto;

    const salt = await genSalt();
    const hashPassword = await hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashPassword,
        salt,
        address: { create: address },
      },
    });

    return new UserEntity(user);
  }
}
