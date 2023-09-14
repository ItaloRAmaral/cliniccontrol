import { Module } from '@nestjs/common';

import { PostgreSqlPrismaOrmService } from '../../../../libs/core-rest-api/adapters/src/database/infra/prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PostgreSqlPrismaOrmService],
})
export class AppModule {}
