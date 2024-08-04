import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtContent } from '../domain/types/jwt-content.type';

@Injectable()
export default class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(content: JwtContent): Promise<{ token: string; refresh: string }> {
    const refreshSecret = this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');

    const [token, refresh] = await Promise.all([
      this.jwtService.signAsync(content),
      this.jwtService.signAsync({ ...content }, { expiresIn: '7d', secret: refreshSecret }),
    ]);

    return { token, refresh };
  }
}
