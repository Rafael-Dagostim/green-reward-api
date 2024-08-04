import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { $Enums } from '@prisma/client';

export const TYPE_AUTH = 'typeAuthorized';
export const TypesAllowed = (
  ...types: ($Enums.UserType | $Enums.CorporationType)[]
): CustomDecorator<string> => SetMetadata(TYPE_AUTH, types);
