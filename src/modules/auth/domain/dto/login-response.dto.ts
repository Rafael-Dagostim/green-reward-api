import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { CorporationEntity } from 'src/shared/entities/corporation.entity';

export class LoginResponse<T extends UserEntity | CorporationEntity> {
  entity: T;
  token: string;
  refresh: string;
}
