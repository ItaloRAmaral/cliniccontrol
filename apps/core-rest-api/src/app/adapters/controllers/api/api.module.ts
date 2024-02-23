import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../../auth/auth.module';
import { CryptographyModule } from '../../cryptography/cryptography.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';
import { UpdatePsychologistController } from './use-cases/psychologist/update-psychologist/update-psychologist.controller';

import { BcryptHasherService } from '../../../core/shared/cryptography/use-cases/bcrypt-hasher.service';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';

import { CreateClinicController } from './use-cases/clinic/create-clinic/create-clinic.controller';
import { DeleteClinicController } from './use-cases/clinic/delete-clinic/delete-clinic.controller';
import { UpdateClinicController } from './use-cases/clinic/update-clinic/update-clinic.controller';
import { CreatePatientController } from './use-cases/patient/create-patient/create-patient.controller';
import { DeletePatientController } from './use-cases/patient/delete-patient/delete-patient.controller';
import { AuthenticatePsychologistController } from './use-cases/psychologist/authenticate-psychologist/authenticate-psychologist.controller';
import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';
import { DeletePsychologistController } from './use-cases/psychologist/delete-psychologist/delete-psychologist.controller';

import { CreateAppointmentController } from './use-cases/appointment/create-appointment/create-appointment.controller';
import { NestjsCreateAppointmentService } from './use-cases/appointment/create-appointment/nestjs-create-appointment.service';
import { DeleteAppointmentController } from './use-cases/appointment/delete-appointment/delete-appointment.controller';
import { NestjsDeleteAppointmentService } from './use-cases/appointment/delete-appointment/nestjs-delete-appointment.service';
import { NestjsCreateClinicService } from './use-cases/clinic/create-clinic/nestjs-create-clinic.service';
import { NestjsDeleteClinicService } from './use-cases/clinic/delete-clinic/nestjs-delete-clinic.service';
import { NestjsUpdateClinicService } from './use-cases/clinic/update-clinic/nestjs-update-clinic.service';
import { CreatePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/create-patient-appointment-registry/create-patient-appointment-registry.controller';
import { NestjsCreatePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/create-patient-appointment-registry/nestjs-create-patient-appointment-registry.service';
import { DeletePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/delete-patient-appointment-registry/delete-patient-appointment-registry.controller';
import { NestjsDeletePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/delete-patient-appointment-registry/nestjs-delete-patient-appointment-registry.service';
import { NestjsUpdatePatientAppointmentRegistryService } from './use-cases/patient-appointment-registry/update-patient-appointment-registry/nestjs-update-patient-appointment-registry.service';
import { UpdatePatientAppointmentRegistryController } from './use-cases/patient-appointment-registry/update-patient-appointment-registry/update-patient-appointment-registry.controller';
import { NestjsCreatePatientService } from './use-cases/patient/create-patient/nestjs-create-patient.service';
import { NestjsDeletePatientService } from './use-cases/patient/delete-patient/nestjs-delete-patient.service';
import { NestjsAuthenticatePsychologistService } from './use-cases/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';
import { NestjsDeletePsychologistService } from './use-cases/psychologist/delete-psychologist/nestjs-delete-psychologist.service';
import { NestjsUpdatePsychologistService } from './use-cases/psychologist/update-psychologist/nestjs-update-psychologist.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseRepositoriesModule,
    EnvModule,
    AuthModule,
    CryptographyModule,
  ],
  controllers: [
    AuthenticatePsychologistController,
    CreatePsychologistController,
    UpdatePsychologistController,
    DeletePsychologistController,
    CreateClinicController,
    UpdateClinicController,
    DeleteClinicController,
    CreatePatientController,
    DeletePatientController,
    CreatePatientAppointmentRegistryController,
    CreateAppointmentController,
    DeleteAppointmentController,
    DeletePatientAppointmentRegistryController,
    UpdatePatientAppointmentRegistryController
  ],
  providers: [
    BcryptHasherService,
    PostgreSqlPrismaOrmService,
    NestjsAuthenticatePsychologistService,
    NestjsCreatePsychologistService,
    NestjsUpdatePsychologistService,
    NestjsDeletePsychologistService,
    NestjsCreateClinicService,
    NestjsUpdateClinicService,
    NestjsDeleteClinicService,
    NestjsCreatePatientService,
    NestjsDeletePatientService,
    NestjsCreatePatientAppointmentRegistryService,
    NestjsCreateAppointmentService,
    NestjsDeleteAppointmentService,
    NestjsDeletePatientAppointmentRegistryService,
    NestjsUpdatePatientAppointmentRegistryService
  ],
})
export class ApiModule {}
