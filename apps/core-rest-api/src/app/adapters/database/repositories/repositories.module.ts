import { Module } from '@nestjs/common';

import { ClinicDatabaseRepository } from '../../../core/domains/clinic/repositories/database-repository';
import { PatientDatabaseRepository } from '../../../core/domains/patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../core/domains/psychologist/repositories/database-repository';

import { PostgreSqlPrismaOrmService } from '../infra/prisma/prisma.service';
import { PostgresqlPrismaOrmClinicRepository } from './clinic/postgres-prisma-orm-clinic-repository';
import { PostgresqlPrismaOrmPatientRepository } from './patient/postgres-prisma-orm-patient-repository';
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
    {
      provide: PatientDatabaseRepository,
      useClass: PostgresqlPrismaOrmPatientRepository,
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
    {
      provide: PatientDatabaseRepository,
      useClass: PostgresqlPrismaOrmPatientRepository,
    },
  ],
})
export class DatabaseRepositoriesModule {}
