// --schema=./libs/core-rest-api/adapters/src/database/infra/prisma/postgresql.schema.prisma

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
    console.info('Connecting to core-rest-api database...');
    return this['$connect']();
  }

  onModuleDestroy() {
    console.info('Disconnecting from core-rest-api database...');
    return this['$disconnect']();
  }
}
