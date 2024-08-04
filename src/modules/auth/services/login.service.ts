import PrismaService from '@core/database/connection.database.service';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { LoginResponseDto } from '../domain/dto/login-response.dto';
import { LoginDto } from '../domain/dto/login.dto';
import { JwtContent } from '../domain/types/jwt-content.type';
import TokenService from './token.service';
import { UserOrCorporation } from '@shared/types';

@Injectable()
export class LoginService {
  private readonly passwordPepper: string;
  private notFoundException: NotFoundException = new NotFoundException(
    null,
    'Login ou senha incorretos!',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    config: ConfigService,
  ) {
    this.passwordPepper = config.getOrThrow('PWD_PEPPER');
  }

  async executeUserLogin(dto: LoginDto): Promise<LoginResponseDto<UserEntity>> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: { contains: dto.login, mode: 'insensitive' } },
          { document: { contains: dto.login, mode: 'insensitive' } },
        ],
      },
      include: { address: true },
    });

    if (!user) throw this.notFoundException;

    const entity = new UserEntity(user);

    const passwordMatch = this.validatePassword(dto.password, entity);
    if (!passwordMatch) throw this.notFoundException;

    return this.createLoginResponse(entity);
  }

  async executeCorporationLogin(dto: LoginDto): Promise<LoginResponseDto<CorporationEntity>> {
    const corporation = await this.prisma.corporation.findFirst({
      where: {
        OR: [
          { email: { contains: dto.login, mode: 'insensitive' } },
          { document: { contains: dto.login, mode: 'insensitive' } },
        ],
      },
      include: { address: true },
    });

    if (!corporation) throw this.notFoundException;

    const entity = new CorporationEntity(corporation);

    const passwordMatch = this.validatePassword(dto.password, entity);
    if (!passwordMatch) throw this.notFoundException;

    return this.createLoginResponse(entity);
  }

  private async validatePassword<T extends UserOrCorporation>(
    password: string,
    entity: T,
  ): Promise<boolean> {
    const hashPassword = await hash(password, `${entity.salt}${this.passwordPepper}`);
    return compare(hashPassword, entity.password);
  }

  private async createLoginResponse<T extends UserOrCorporation>(
    entity: T,
  ): Promise<LoginResponseDto<T>> {
    const jwtContent: JwtContent = {
      entityId: entity.id,
      type: entity.type,
    };

    const { token, refresh } = await this.tokenService.execute(jwtContent);

    return {
      entity,
      token,
      refresh,
    };
  }
}
