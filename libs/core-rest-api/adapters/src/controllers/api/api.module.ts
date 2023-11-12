import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../../auth/auth.module';
import { CryptographyModule } from '../../cryptography/cryptography.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';

import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';

import { AuthenticatePsychologistController } from './use-cases/psychologist/authenticate-psychologist/authenticate-psychologist.controller';
import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';
import { UpdatePsychologistController } from './use-cases/psychologist/update-psychologist/update-psychologist.controller';

import { NestjsAuthenticatePsychologistService } from './use-cases/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';
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
    CreatePsychologistController,
    AuthenticatePsychologistController,
    UpdatePsychologistController,
  ],
  providers: [
    BcryptHasherService,
    PostgreSqlPrismaOrmService,
    NestjsCreatePsychologistService,
    NestjsAuthenticatePsychologistService,
    NestjsUpdatePsychologistService,
  ],
})
export class ApiModule {}
