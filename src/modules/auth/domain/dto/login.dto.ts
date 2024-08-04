import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário / Email ou documento',
  })
  login: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
  })
  password: string;
}
