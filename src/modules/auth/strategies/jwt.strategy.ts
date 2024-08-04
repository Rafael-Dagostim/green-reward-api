import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtContent } from '../domain/types/jwt-content.type';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import PrismaService from '@core/database/connection.database.service';
import { UserOrCorporation } from '@shared/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtContent): Promise<UserOrCorporation> {
    if (payload.type === 'PLAYER' || payload.type === 'ADMIN') {
      const user = await this.prisma.user.findUnique({ where: { id: payload.entityId } });
      return new UserEntity(user);
    }
    const corporation = await this.prisma.corporation.findUnique({
      where: { id: payload.entityId },
    });

    return new CorporationEntity(corporation);
  }
}
