import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { Module } from '@nestjs/common';
import { PostgreSqlPrismaOrmService } from '../infra/prisma/prisma.service';
import { PostgresqlPrismaOrmClinicRepository } from './clinic/postgres-prisma-orm-clinic-repository';
import { PostgresqlPrismaOrmPsychologistRepository } from './psychologist/postgresql-prisma-orm-psychologist-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PostgreSqlPrismaOrmService,
    {
      provide: PsychologistDatabaseRepository,
      useClass: PostgresqlPrismaOrmPsychologistRepository,
    },
    {
      provide: ClinicDatabaseRepository,
      useClass: PostgresqlPrismaOrmClinicRepository,
    },
  ],
  exports: [
    PostgreSqlPrismaOrmService,
    {
      provide: PsychologistDatabaseRepository,
      useClass: PostgresqlPrismaOrmPsychologistRepository,
    },
    {
      provide: ClinicDatabaseRepository,
      useClass: PostgresqlPrismaOrmClinicRepository,
    },
  ],
})
export class DatabaseRepositoriesModule {}
