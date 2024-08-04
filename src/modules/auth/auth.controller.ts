import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { LoginDto } from './domain/dto/login.dto';
import { UserEntity } from '../user/domain/entities/user.entity';
import { LoginResponse } from './domain/dto/login-response.dto';
import { CorporationEntity } from '../../shared/entities/corporation.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: LoginService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginResponse<UserEntity>> {
    return this.authService.executeUserLogin(dto);
  }

  @Post('login/corporation')
  async loginCorporation(@Body() dto: LoginDto): Promise<LoginResponse<CorporationEntity>> {
    return this.authService.executeCorporationLogin(dto);
  }
}
