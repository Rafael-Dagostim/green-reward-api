import { Module } from '@nestjs/common';

import { UserController } from './user.controller';

import { UserCreateService } from './services/user-create.service';
import { UserDeleteService } from './services/user-delete.service';
import { UserFindManyService } from './services/user-find-many.service';
import { UserFindOneService } from './services/user-find-one.service';
import { UserUpdateService } from './services/user-update.service';

@Module({
  controllers: [UserController],
  providers: [
    UserFindOneService,
    UserFindManyService,
    UserCreateService,
    UserUpdateService,
    UserDeleteService,
  ],
})
export class UserModule {}
