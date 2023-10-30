import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { CryptographyModule } from '../../cryptography/cryptography.module';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';
import { CreateClinicController } from './use-cases/clinic/create-clinic/create-clinic.controller';
import { NestjsCreateClinicService } from './use-cases/clinic/create-clinic/nestjs-create-clinic.service';
import { CreatePsychologistController } from './use-cases/psychologist/create-psychologist/create-psychologist.controller';
import { NestjsCreatePsychologistService } from './use-cases/psychologist/create-psychologist/nestjs-create-psychologist.service';

@Module({
  imports: [
    DatabaseRepositoriesModule,
    EnvModule,
    AuthModule,
    CryptographyModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [CreatePsychologistController, CreateClinicController],
  providers: [PostgreSqlPrismaOrmService, NestjsCreatePsychologistService, NestjsCreateClinicService],
})
export class ApiModule {}
