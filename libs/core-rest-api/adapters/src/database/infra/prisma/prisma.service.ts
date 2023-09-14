import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostgreSqlPrismaOrmService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  onModuleInit() {
    console.info('Connecting to core-res-api database...');
    return this['$connect']();
  }

  onModuleDestroy() {
    console.info('Disconnecting from core-res-api database...');
    return this['$disconnect']();
  }
}
