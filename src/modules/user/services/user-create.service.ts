import { genSalt, hash } from 'bcrypt';
import PrismaService from '@core/database/connection.database.service';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserCreateService {
  private readonly passwordPepper: string;
  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    this.passwordPepper = config.getOrThrow('PWD_PEPPER');
  }

  async execute(dto: UserCreateDto): Promise<UserEntity> {
    const { address, password, ...userData } = dto;

    const salt = await genSalt();
    const hashPassword = await hash(password, `${salt}${this.passwordPepper}`);

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
