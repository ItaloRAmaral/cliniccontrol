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
import { NestjsCreateClinicService } from './use-cases/clinic/create-clinic/nestjs-create-clinic.service';
import { DeleteClinicController } from './use-cases/clinic/delete-clinic/delete-clinic.controller';
import { NestjsDeleteClinicService } from './use-cases/clinic/delete-clinic/nestjs-delete-clinic.service';
import { NestjsUpdateClinicService } from './use-cases/clinic/update-clinic/nestjs-update-clinic.service';
import { UpdateClinicController } from './use-cases/clinic/update-clinic/update-clinic.controller';
import { CreatePatientController } from './use-cases/patient/create-patient/create-patient.controller';
import { NestjsCreatePatientService } from './use-cases/patient/create-patient/nestjs-create-patient.service';
import { AuthenticatePsychologistController } from './use-cases/psychologist/authenticate-psychologist/authenticate-psychologist.controller';
import { NestjsAuthenticatePsychologistService } from './use-cases/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';
import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';
import { DeletePsychologistController } from './use-cases/psychologist/delete-psychologist/delete-psychologist.controller';
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
  ],
})
export class ApiModule {}
