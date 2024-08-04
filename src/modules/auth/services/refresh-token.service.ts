import PrismaService from '@core/database/connection.database.service';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../domain/dto/login-response.dto';
import { JwtContent } from '../domain/types/jwt-content.type';
import TokenService from './token.service';
import { UserOrCorporation } from '@shared/types';

@Injectable()
export default class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(refreshToken: string): Promise<LoginResponseDto<UserOrCorporation>> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtContent>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const entity: UserOrCorporation =
        payload.type === 'PLAYER' || payload.type === 'ADMIN'
          ? await this.findUser(payload.entityId)
          : await this.findCorporation(payload.entityId);

      const tokens = await this.tokenService.execute({ entityId: entity.id, type: entity.type });

      return { entity, ...tokens };
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async findCorporation(id: number): Promise<CorporationEntity> {
    const corporation = await this.prisma.corporation.findUnique({
      where: { id },
      include: { address: true },
    });
    return new CorporationEntity(corporation);
  }

  private async findUser(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
    return new UserEntity(user);
  }
}
