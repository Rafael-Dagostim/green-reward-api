import { CorporationEntity } from 'src/modules/corporation/domain/entities/corporation.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class LoginResponse<T extends UserEntity | CorporationEntity> {
  entity: T;
  token: string;
  refresh: string;
}
