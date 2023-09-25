import { CreatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';
import { Module } from '@nestjs/common';
import { PostgreSqlPrismaOrmService } from '../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../database/repositories/repositories.module';
import { CreatePsychologistController } from './use-case/create-psychologist/create-psychologist.controller';

@Module({
  imports: [DatabaseRepositoriesModule],
  controllers: [CreatePsychologistController],
  providers: [PostgreSqlPrismaOrmService, CreatePsychologistService],
})
export class ApiModule {}
