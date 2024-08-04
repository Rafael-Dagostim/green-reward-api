import { CorporationEntity } from '@modules/corporation/domain/entities/corporation.entity';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

export type UserOrCorporation = UserEntity | CorporationEntity;
