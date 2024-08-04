import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginDto } from './domain/dto/login.dto';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { LoginResponseDto } from './domain/dto/login-response.dto';
import { CorporationEntity } from '../corporation/domain/entities/corporation.entity';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';
import RefreshTokenService from './services/refresh-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  /**
   * Realizar Login na plataforma utilizando os acessos de Player
   * @param dto Dados de login
   * @returns Dados do player que está realizando o login
   */
  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto<UserEntity>> {
    return this.authService.executeUserLogin(dto);
  }

  /**
   * Realizar Login na plataforma utilizando os acessos de corporação
   * @param dto Dados de login
   * @returns Dados da corporação que está realizando o login
   */
  @Post('login/corporation')
  @Public()
  async loginCorporation(@Body() dto: LoginDto): Promise<LoginResponseDto<CorporationEntity>> {
    return this.authService.executeCorporationLogin(dto);
  }

  @Post('refresh')
  @Public()
  async refreshToken(
    @Body() { token }: { token: string },
  ): Promise<LoginResponseDto<UserEntity | CorporationEntity>> {
    const data = await this.refreshTokenService.execute(token);
    return data;
  }
}
