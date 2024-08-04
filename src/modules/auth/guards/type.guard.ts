import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { TYPE_AUTH } from '@shared/decorators/types-allowed.decorator';
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
    if (entity.type === 'ADMIN') return true;

    if (!types.includes(entity.type)) {
      throw new ForbiddenException(null, 'Esse tipo de usuário não possui acesso a essa rota');
    }

    return true;
  }
}
