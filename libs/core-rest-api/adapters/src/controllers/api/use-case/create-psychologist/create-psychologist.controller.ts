// eslint-disable-next-line @nx/enforce-module-boundaries
import { PostgreSqlPrismaOrmService } from '@clinicControl/core-rest-api/adapters/src/database/infra/prisma/prisma.service';
import { ICreatePsychologistServiceProps } from '@clinicControl/core-rest-api/core/src/domains/psychologist/interfaces/psychologist';
import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { plainToInstance } from 'class-transformer';

export class PostgresqlPrismaOrmPsychologistRepository
  implements PsychologistDatabaseRepository
{
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async createPsychologist(
    createPsychologistDto: ICreatePsychologistServiceProps
  ) {
    const createPsychologistDtoInstance = plainToInstance(
      CreatePsychologistDto,
      createPsychologistDto
    );

    await applicationValidateOrReject(createPsychologistDtoInstance);

    const isPsychologistExists = await this.findPsychologistById();
  }
}
