import { CreatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';
import { envSchema } from '../../env/env';
import { EnvModule } from '../../env/env.module';
import { CreatePsychologistController } from './use-cases/create-psychologist/create-psychologist.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseRepositoriesModule,
    EnvModule,
    AuthModule,
  ],
  controllers: [CreatePsychologistController],
  providers: [PostgreSqlPrismaOrmService, CreatePsychologistService],
})
export class ApiModule {}
