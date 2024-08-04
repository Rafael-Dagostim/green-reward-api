import { Module } from '@nestjs/common';
import DatabaseModule from './core/database/database.module';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CorporationModule } from './modules/corporation/corporation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CorporationModule,
  ],
})
export class AppModule {}
