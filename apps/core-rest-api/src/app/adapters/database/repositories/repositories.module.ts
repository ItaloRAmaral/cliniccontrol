import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../infra/typeorm/entities/Appointment';
import { Clinic } from '../infra/typeorm/entities/Clinic';
import { Patient } from '../infra/typeorm/entities/Patient';
import { PatientAppointmentRegistry } from '../infra/typeorm/entities/PatientAppointmentRegistry';
import { Psychologist } from '../infra/typeorm/entities/psychologist.entitie';
import { PostgresTypeOrmRepository } from './psychologist/teste';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Psychologist,
      Appointment,
      Clinic,
      Patient,
      PatientAppointmentRegistry,
    ]),
  ],
  controllers: [],
  providers: [
    PostgresTypeOrmRepository,
    // PostgreSqlPrismaOrmService,
    // {
    //   provide: PsychologistDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPsychologistRepository,
    // },
    // {
    //   provide: ClinicDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmClinicRepository,
    // },
    // {
    //   provide: PatientDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPatientRepository,
    // },
    // {
    //   provide: PatientAppointmentRegistryDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPatientAppointmentRegistryRepository,
    // },
    // {
    //   provide: AppointmentDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmAppointmentRepository,
    // },
  ],
  exports: [
    PostgresTypeOrmRepository,
    // PostgreSqlPrismaOrmService,
    // {
    //   provide: PsychologistDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPsychologistRepository,
    // },
    // {
    //   provide: ClinicDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmClinicRepository,
    // },
    // {
    //   provide: PatientDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPatientRepository,
    // },
    // {
    //   provide: PatientAppointmentRegistryDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmPatientAppointmentRegistryRepository,
    // },
    // {
    //   provide: AppointmentDatabaseRepository,
    //   useClass: PostgresqlPrismaOrmAppointmentRepository,
    // },
  ],
})
export class DatabaseRepositoriesModule {}
