import { Module } from '@nestjs/common';

import { CorporationController } from './corporation.controller';

import { CorporationCreateService } from './services/corporation-create.service';
import { CorporationDeleteService } from './services/corporation-delete.service';
import { CorporationFindManyService } from './services/corporation-find-many.service';
import { CorporationFindOneService } from './services/corporation-find-one.service';
import { CorporationUpdateService } from './services/corporation-update.service';
import SponsorCreateAwardService from './services/sponsor-create-award.service';

@Module({
  controllers: [CorporationController],
  providers: [
    CorporationFindOneService,
    CorporationFindManyService,
    CorporationCreateService,
    CorporationUpdateService,
    CorporationDeleteService,
    SponsorCreateAwardService,
  ],
})
export class CorporationModule {}
