import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export default class PrismaService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}
