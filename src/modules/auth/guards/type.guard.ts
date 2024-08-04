import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { TYPE_AUTH } from '@shared/decorators/type.decorator';
import { UserOrCorporation } from '@shared/types';

@Injectable()
export class TypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const types = this.reflector.get<($Enums.CorporationType | $Enums.UserType)[]>(
      TYPE_AUTH,
      context.getHandler(),
    );

    if (!types) return true;

    const request = context.switchToHttp().getRequest();
    const entity = request.user as UserOrCorporation;

    return types.includes(entity.type);
  }

  handleRequest(err, user): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
