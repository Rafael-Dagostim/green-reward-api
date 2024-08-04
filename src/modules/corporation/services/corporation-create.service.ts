import { PrismaClient } from '@prisma/client';
import { CorporationEntity } from '../domain/entities/corporation.entity';
import { CorporationCreateDto } from '../domain/dto/corporation-create.dto';
import { genSalt, hash } from 'bcrypt';

export class CorporationCreateService {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(dto: CorporationCreateDto): Promise<CorporationEntity> {
    const { address, password, ...corporationData } = dto;

    const salt = await genSalt();
    const hashPassword = await hash(password, salt);

    const corporation = await this.prisma.corporation.create({
      data: {
        ...corporationData,
        password: hashPassword,
        salt,
        address: { create: address },
      },
    });

    return new CorporationEntity(corporation);
  }
}
