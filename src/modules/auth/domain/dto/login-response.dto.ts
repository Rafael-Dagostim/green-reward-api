import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

export class LoginResponseDto<T extends UserEntity | CorporationEntity> {
  entity: T;
  token: string;
  refresh: string;
}
