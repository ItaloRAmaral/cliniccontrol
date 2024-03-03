import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../../auth/auth.module';
import { CryptographyModule } from '../../cryptography/cryptography.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';
// import { UpdatePsychologistController } from './use-cases/psychologist/update-psychologist/update-psychologist.controller';

// import { BcryptHasherService } from '../../../core/shared/cryptography/use-cases/bcrypt-hasher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../../database/infra/typeorm/entities/Appointment';
import { Clinic } from '../../database/infra/typeorm/entities/Clinic';
import { Patient } from '../../database/infra/typeorm/entities/Patient';
import { PatientAppointmentRegistry } from '../../database/infra/typeorm/entities/PatientAppointmentRegistry';
import { Psychologist } from '../../database/infra/typeorm/entities/psychologist.entitie';
import { PostgresTypeOrmRepository } from '../../database/repositories/psychologist/teste';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';
import { TestetController } from './use-cases/teste-controller';

// import { CreateClinicController } from './use-cases/clinic/create-clinic/create-clinic.controller';
// import { DeleteClinicController } from './use-cases/clinic/delete-clinic/delete-clinic.controller';
// import { UpdateClinicController } from './use-cases/clinic/update-clinic/update-clinic.controller';
// import { CreatePatientController } from './use-cases/patient/create-patient/create-patient.controller';
// import { DeletePatientController } from './use-cases/patient/delete-patient/delete-patient.controller';
// import { AuthenticatePsychologistController } from './use-cases/psychologist/authenticate-psychologist/authenticate-psychologist.controller';
// import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';
// import { DeletePsychologistController } from './use-cases/psychologist/delete-psychologist/delete-psychologist.controller';

// import { typeOrmService } from '../../database/infra/typeorm/typeorm.service';
// import { CreateAppointmentController } from './use-cases/appointment/create-appointment/create-appointment.controller';
// import { NestjsCreateAppointmentService } from './use-cases/appointment/create-appointment/nestjs-create-appointment.service';
// import { NestjsCreateClinicService } from './use-cases/clinic/create-clinic/nestjs-create-clinic.service';
// import { NestjsDeleteClinicService } from './use-cases/clinic/delete-clinic/nestjs-delete-clinic.service';
// import { NestjsUpdateClinicService } from './use-cases/clinic/update-clinic/nestjs-update-clinic.service';
// import { CreatePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/create-patient-appointment-registry/create-patient-appointment-registry.controller';
// import { NestjsCreatePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/create-patient-appointment-registry/nestjs-create-patient-appointment-registry.service';
// import { DeletePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/delete-patient-appointment-registry/delete-patient-appointment-registry.controller';
// import { NestjsDeletePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/delete-patient-appointment-registry/nestjs-delete-patient-appointment-registry.service';
// import { NestjsUpdatePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/update-patient-appointment-registry/nestjs-update-patient-appointment-registry.service';
// import { UpdatePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/update-patient-appointment-registry/update-patient-appointment-registry.controller';
// import { NestjsCreatePatientService } from './use-cases/patient/create-patient/nestjs-create-patient.service';
// import { NestjsDeletePatientService } from './use-cases/patient/delete-patient/nestjs-delete-patient.service';
// import { NestjsAuthenticatePsychologistService } from './use-cases/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
// import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';
// import { NestjsDeletePsychologistService } from './use-cases/psychologist/delete-psychologist/nestjs-delete-psychologist.service';
// import { NestjsUpdatePsychologistService } from './use-cases/psychologist/update-psychologist/nestjs-update-psychologist.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([
      Psychologist,
      Appointment,
      Clinic,
      Patient,
      PatientAppointmentRegistry,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cliniccontrol',
      password: 'cliniccontrolpassword',
      database: 'core-rest-api',
      entities: [__dirname + '../../database/infra/typeorm/entities/*.{js,ts}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    DatabaseRepositoriesModule,
    EnvModule,
    AuthModule,
    CryptographyModule,
  ],
  controllers: [
    TestetController,
    // UpdatePsychologistController,
    // AuthenticatePsychologistController,
    // CreatePsychologistController,
    // UpdatePsychologistController,
    // DeletePsychologistController,
    // CreateClinicController,
    // UpdateClinicController,
    // DeleteClinicController,
    // CreatePatientController,
    // DeletePatientController,
    // CreatePatientAppointmentRegistryController,
    // CreateAppointmentController,
    // DeletePatientAppointmentRegistryController,
    // UpdatePatientAppointmentRegistryController,
  ],
  providers: [
    PostgresTypeOrmRepository,
    // BcryptHasherService,
    // // PostgreSqlPrismaOrmService,
    // NestjsAuthenticatePsychologistService,
    // NestjsCreatePsychologistService,
    // NestjsUpdatePsychologistService,
    // NestjsDeletePsychologistService,
    // NestjsCreateClinicService,
    // NestjsUpdateClinicService,
    // NestjsDeleteClinicService,
    // NestjsCreatePatientService,
    // NestjsDeletePatientService,
    // NestjsCreatePatientAppointmentRegistryService,
    // NestjsCreateAppointmentService,
    // NestjsDeletePatientAppointmentRegistryService,
    // NestjsUpdatePatientAppointmentRegistryService,
  ],
  exports: [],
})
export class ApiModule {}
