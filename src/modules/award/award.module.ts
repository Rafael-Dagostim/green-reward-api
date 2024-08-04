import { Module } from '@nestjs/common';
import SponsorCreateAwardService from './services/sponsor-create-award.service';
import AwardController from './award.controller';
import RescueAwardService from './services/rescue-award.service';

@Module({
  providers: [SponsorCreateAwardService, RescueAwardService],
  controllers: [AwardController],
})
export default class AwardModule {}
