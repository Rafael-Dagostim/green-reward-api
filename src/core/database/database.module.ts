import { Global, Module } from '@nestjs/common';
import PrismaService from './services/connection.database.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class DatabaseModule {}
