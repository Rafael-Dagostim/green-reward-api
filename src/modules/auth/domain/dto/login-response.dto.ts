import { UserOrCorporation } from '@shared/types';

export class LoginResponseDto<T extends UserOrCorporation> {
  entity: T;
  token: string;
  refresh: string;
}
