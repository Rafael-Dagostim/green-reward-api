import { Global, Module } from '@nestjs/common';
import PrismaService from './connection.database.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export default class DatabaseModule {}
