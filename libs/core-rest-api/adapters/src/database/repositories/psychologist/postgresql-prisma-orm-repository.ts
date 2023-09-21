// eslint-disable-next-line @nx/enforce-module-boundaries
import { PostgreSqlPrismaOrmService } from '@clinicControl/core-rest-api/adapters/src/database/infra/prisma/prisma.service';
import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { UpdatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { ConflictException, Injectable } from '@nestjs/common';

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

    const newPsychologist = this.postgreSqlPrismaOrmService.psychologist.create(
      {
        data: psychologist,
      }
    );

    return newPsychologist as unknown as PsychologistEntity;
  }

  async findPsychologistByEmail(
    email: string
  ): Promise<PsychologistEntity | null> {
    const psychologist =
      this.postgreSqlPrismaOrmService.psychologist.findUnique({
        where: {
          email: email,
        },
      });

    if (!psychologist) {
      return null;
    }

    return psychologist as unknown as PsychologistEntity;
  }

  async findPsychologistById(id: string): Promise<PsychologistEntity | null> {
    const psychologist =
      this.postgreSqlPrismaOrmService.psychologist.findUnique({
        where: {
          id: id,
        },
      });

    if (!psychologist) {
      return null;
    }

    return psychologist as unknown as PsychologistEntity;
  }

  async getPsychologists(): Promise<PsychologistEntity[]> {
    const psychologists =
      this.postgreSqlPrismaOrmService.psychologist.findMany();

    return psychologists as unknown as PsychologistEntity[];
  }

  async updatePsychologist(
    newPsychologist: UpdatePsychologistDto
  ): Promise<void> {
    const oldPsychologist = await this.findPsychologistById(newPsychologist.id);

    if (!oldPsychologist) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    this.postgreSqlPrismaOrmService.psychologist.update({
      where: {
        id: newPsychologist.id,
      },
      data: {
        ...newPsychologist,
        updatedAt: new Date(),
      },
    });
  }

  async deletePsychologist(email: string): Promise<void> {
    const isPsychologistExists = await this.findPsychologistByEmail(email);

    if (!isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    this.postgreSqlPrismaOrmService.psychologist.delete({
      where: {
        email: email,
      },
    });
  }
}
