import { Module } from '@nestjs/common';
import DatabaseModule from './core/database/database.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CorporationModule } from './modules/corporation/corporation.module';
import AwardModule from '@modules/award/award.module';
import { MissionModule } from '@modules/mission/mission.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MissionModule,
    AuthModule,
    UserModule,
    CorporationModule,
    AwardModule,
  ],
})
export class AppModule {}
