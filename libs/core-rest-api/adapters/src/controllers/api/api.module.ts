import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { CryptographyModule } from '../../cryptography/cryptography.module';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';
import { PsychologistLoginController } from './use-cases/psychologist/authenticate-psychologist/psychologist-login.controller';
import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';

import { NestjsAuthenticatePsychologistService } from './use-cases/psychologist/authenticate-psychologist/nestjs-authenticate-psychologist.service';
import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';

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
  controllers: [CreatePsychologistController, PsychologistLoginController],
  providers: [
    BcryptHasherService,
    PostgreSqlPrismaOrmService,
    NestjsCreatePsychologistService,
    NestjsAuthenticatePsychologistService,
  ],
})
export class ApiModule {}
