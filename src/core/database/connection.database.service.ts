import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export default class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
