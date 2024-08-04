import { Module } from '@nestjs/common';

import { MissionController } from './mission.controller';

import { MissionCreateService } from './services/mission-create.service';
import { MissionDeleteService } from './services/mission-delete.service';
import { MissionFindManyService } from './services/mission-find-many.service';
import { MissionFindOneService } from './services/mission-find-one.service';
import { MissionUpdateService } from './services/mission-update.service';
import FinishMissionUserService from './services/finish-mission-user.service';

@Module({
  controllers: [MissionController],
  providers: [
    MissionFindOneService,
    MissionFindManyService,
    MissionCreateService,
    MissionUpdateService,
    MissionDeleteService,
    FinishMissionUserService,
  ],
})
export class MissionModule {}
