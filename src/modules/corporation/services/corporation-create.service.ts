import { genSalt, hash } from 'bcrypt';
import PrismaService from 'src/core/database/connection.database.service';
import { CorporationCreateDto } from '../domain/dto/corporation-create.dto';
import { CorporationEntity } from '../domain/entities/corporation.entity';

export class CorporationCreateService {
  constructor(private readonly prisma: PrismaService) {}

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
