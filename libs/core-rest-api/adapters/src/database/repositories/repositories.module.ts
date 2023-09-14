import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { Module } from '@nestjs/common';
import { PostgreSqlPrismaOrmService } from '../infra/prisma/prisma.service';
import { PostgresqlPrismaOrmPsychologistRepository } from './psychologist/postgresql-prisma-orm.repository';
@Module({
  controllers: [],
  providers: [
    PostgreSqlPrismaOrmService,
    {
      provide: PsychologistDatabaseRepository,
      useClass: PostgresqlPrismaOrmPsychologistRepository,
    },
  ],
  exports: [
    PostgreSqlPrismaOrmService,
    {
      provide: PsychologistDatabaseRepository,
      useClass: PostgresqlPrismaOrmPsychologistRepository,
    },
  ],
})
export class DatabaseRepositoriesModule {}
