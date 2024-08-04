import { Module } from '@nestjs/common';
import SponsorCreateAwardService from './services/sponsor-create-award.service';
import AwardController from './award.controller';
import RescueAwardService from './services/rescue-award.service';
import { AwardFindManyService } from './services/get-award.service';
import DeleteAwardService from './services/delete-award.service';

@Module({
  providers: [
    SponsorCreateAwardService,
    RescueAwardService,
    AwardFindManyService,
    DeleteAwardService,
  ],
  controllers: [AwardController],
})
export default class AwardModule {}
