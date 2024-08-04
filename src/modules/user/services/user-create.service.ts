import { genSalt, hash } from 'bcrypt';
import PrismaService from '@core/database/connection.database.service';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCreateService {
  constructor(private readonly prisma: PrismaService) {}

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
