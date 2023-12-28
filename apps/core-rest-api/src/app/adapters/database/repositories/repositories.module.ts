import { Module } from '@nestjs/common';

import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { PatientDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';

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
