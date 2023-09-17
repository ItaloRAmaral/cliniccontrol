import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { ConflictException, Injectable } from '@nestjs/common';
import { PostgreSqlPrismaOrmService } from '../../infra/prisma/prisma.service';

@Injectable()
export class PostgresqlPrismaOrmPsychologistRepository
  implements PsychologistDatabaseRepository
{
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async createPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity> {
    const isPsychologistExists = await this.findPsychologistByEmail(
      psychologist.email
    );

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS']
      );
    }

    const newPsychologist = await this.postgreSqlPrismaOrmService[
      'psychologist'
    ].create({
      data: psychologist,
    });

    return newPsychologist as PsychologistEntity;
  }

  async findPsychologistByEmail(
    email: string
  ): Promise<PsychologistEntity | null> {
    const psychologist = await this.postgreSqlPrismaOrmService[
      'psychologist'
    ].findUnique({
      where: {
        email,
      },
    });

    if (!psychologist) {
      return null;
    }

    return psychologist as PsychologistEntity;
  }
}
