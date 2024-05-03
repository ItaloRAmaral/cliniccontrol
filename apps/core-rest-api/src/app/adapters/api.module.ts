import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { envSchema } from './env/env';
import { EnvModule } from './env/env.module';

import { BcryptHasherService } from '../core/shared/cryptography/use-cases/bcrypt-hasher.service';
import { PostgreSqlPrismaOrmService } from './database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from './database/repositories/repositories.module';

import { NestjsCreateAppointmentService } from './routes/v1/appointment/create-appointment/nestjs-create-appointment.service';
import { DeleteAppointmentController } from './routes/v1/appointment/delete-appointment/delete-appointment.controller';
import { NestjsDeleteAppointmentService } from './routes/v1/appointment/delete-appointment/nestjs-delete-appointment.service';
import { NestjsCreateClinicService } from './routes/v1/clinic/create-clinic/nestjs-create-clinic.service';
import { NestjsDeleteClinicService } from './routes/v1/clinic/delete-clinic/nestjs-delete-clinic.service';
import { NestjsUpdateClinicService } from './routes/v1/clinic/update-clinic/nestjs-update-clinic.service';
import { NestjsCreatePatientService } from './routes/v1/patient/create-patient/nestjs-create-patient.service';
import { NestjsDeletePatientService } from './routes/v1/patient/delete-patient/nestjs-delete-patient.service';
import { NestjsUpdatePatientService } from './routes/v1/patient/update-patient/nestjs-update-patient.service';
import { NestjsAuthenticatePsychologistService } from './routes/v1/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
import { NestjsCreatePsychologistService } from './routes/v1/psychologist/create-psychologist/nestjs-create-psychologist.service';
import { NestjsDeletePsychologistService } from './routes/v1/psychologist/delete-psychologist/nestjs-delete-psychologist.service';
import { NestjsUpdatePsychologistService } from './routes/v1/psychologist/update-psychologist/nestjs-update-psychologist.service';

import { CreateAppointmentController } from './routes/v1/appointment/create-appointment/create-appointment.controller';
import { NestjsUpdateAppointmentService } from './routes/v1/appointment/update-appointment/nestjs-update-appointment.service';
import { UpdateAppointmentController } from './routes/v1/appointment/update-appointment/update-appointment.controller';
import { CreateClinicController } from './routes/v1/clinic/create-clinic/create-clinic.controller';
import { DeleteClinicController } from './routes/v1/clinic/delete-clinic/delete-clinic.controller';
import { UpdateClinicController } from './routes/v1/clinic/update-clinic/update-clinic.controller';
import { CreatePatientAppointmentRegistryController } from './routes/v1/patient-appointment-registry/create-patient-appointment-registry/create-patient-appointment-registry.controller';
import { NestjsCreatePatientAppointmentRegistryService } from './routes/v1/patient-appointment-registry/create-patient-appointment-registry/nestjs-create-patient-appointment-registry.service';
import { DeletePatientAppointmentRegistryController } from './routes/v1/patient-appointment-registry/delete-patient-appointment-registry/delete-patient-appointment-registry.controller';
import { NestjsDeletePatientAppointmentRegistryService } from './routes/v1/patient-appointment-registry/delete-patient-appointment-registry/nestjs-delete-patient-appointment-registry.service';
import { NestjsUpdatePatientAppointmentRegistryService } from './routes/v1/patient-appointment-registry/update-patient-appointment-registry/nestjs-update-patient-appointment-registry.service';
import { UpdatePatientAppointmentRegistryController } from './routes/v1/patient-appointment-registry/update-patient-appointment-registry/update-patient-appointment-registry.controller';
import { CreatePatientController } from './routes/v1/patient/create-patient/create-patient.controller';
import { DeletePatientController } from './routes/v1/patient/delete-patient/delete-patient.controller';
import { UpdatePatientController } from './routes/v1/patient/update-patient/update-patient.controller';
import { AuthenticatePsychologistController } from './routes/v1/psychologist/authenticate-psychologist/authenticate-psychologist.controller';
import { CreatePsychologistController } from './routes/v1/psychologist/create-psychologist/create-psychologist.controller';
import { DeletePsychologistController } from './routes/v1/psychologist/delete-psychologist/delete-psychologist.controller';
import { UpdatePsychologistController } from './routes/v1/psychologist/update-psychologist/update-psychologist.controller';

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
    UpdatePatientAppointmentRegistryController,
    UpdatePatientController,
    UpdateAppointmentController,
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
    NestjsUpdatePatientAppointmentRegistryService,
    NestjsUpdatePatientService,
    NestjsUpdateAppointmentService,
  ],
})
export class ApiModule {}
