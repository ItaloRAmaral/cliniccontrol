import { Module } from '@nestjs/common';

import { ClinicDatabaseRepository } from '../../../core/domains/clinic/repositories/database-repository';
import { PatientDatabaseRepository } from '../../../core/domains/patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../core/domains/psychologist/repositories/database-repository';

import { AppointmentDatabaseRepository } from '../../../core/domains/appointment/repositories/database-repository';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { PostgreSqlPrismaOrmService } from '../infra/prisma/prisma.service';
import { PostgresqlPrismaOrmAppointmentRepository } from './appointment/postgres-prisma-orm-appointment-repository';
import { PostgresqlPrismaOrmClinicRepository } from './clinic/postgres-prisma-orm-clinic-repository';
import { PostgresqlPrismaOrmPatientAppointmentRegistryRepository } from './patient-appointment-registry/postgresql-prisma-orm-registry-repository';
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
    {
      provide: PatientAppointmentRegistryDatabaseRepository,
      useClass: PostgresqlPrismaOrmPatientAppointmentRegistryRepository,
    },
    {
      provide: AppointmentDatabaseRepository,
      useClass: PostgresqlPrismaOrmAppointmentRepository,
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
    {
      provide: PatientAppointmentRegistryDatabaseRepository,
      useClass: PostgresqlPrismaOrmPatientAppointmentRegistryRepository,
    },
    {
      provide: AppointmentDatabaseRepository,
      useClass: PostgresqlPrismaOrmAppointmentRepository,
    },
  ],
})
export class DatabaseRepositoriesModule {}
