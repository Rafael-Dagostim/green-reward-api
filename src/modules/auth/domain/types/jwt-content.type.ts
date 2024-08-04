import { $Enums } from '@prisma/client';

export type JwtContent = {
  entityId: number;
  type: $Enums.UserType | $Enums.CorporationType;
};
