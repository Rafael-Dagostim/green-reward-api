import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import PrismaService from '@core/database/connection.database.service';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { LoginResponse } from '../domain/dto/login-response.dto';
import { LoginDto } from '../domain/dto/login.dto';
import { JwtContent } from '../domain/types/jwt-content.type';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';

@Injectable()
export class LoginService {
  private readonly passwordPepper: string;
  private notFoundException: NotFoundException = new NotFoundException(
    null,
    'Login ou senha incorretos!',
  );

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    config: ConfigService,
  ) {
    this.passwordPepper = config.getOrThrow('PWD_PEPPER');
  }

  async executeUserLogin(dto: LoginDto): Promise<LoginResponse<UserEntity>> {
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

  async executeCorporationLogin(dto: LoginDto): Promise<LoginResponse<CorporationEntity>> {
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

  private async validatePassword<T extends UserEntity | CorporationEntity>(
    password: string,
    entity: T,
  ): Promise<boolean> {
    const hashPassword = await hash(password, `${entity.salt}${this.passwordPepper}`);
    return compare(hashPassword, entity.password);
  }

  private createLoginResponse<T extends UserEntity | CorporationEntity>(
    entity: T,
  ): LoginResponse<T> {
    const jwtContent: JwtContent = {
      entityId: entity.id,
      type: entity.type,
    };

    return {
      entity,
      token: this.jwtService.sign(jwtContent),
      refresh: this.jwtService.sign(jwtContent, { expiresIn: '7d' }),
    };
  }
}
