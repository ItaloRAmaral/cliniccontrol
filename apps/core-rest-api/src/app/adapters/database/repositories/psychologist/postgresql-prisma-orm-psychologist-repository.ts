import { ConflictException, Injectable } from '@nestjs/common';
import { PsychologistEntity } from '../../../../core/domains/psychologist/entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '../../../../core/domains/psychologist/repositories/database-repository';
import { CreatePsychologistInputDto } from '../../../../core/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { UpdatePsychologistInputDto } from '../../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PostgreSqlPrismaOrmService } from '../../infra/prisma/prisma.service';
import { PostgresqlPrismaPsychologistMapper } from '../../mappers/postgresql-prisma-psychologist-mapper';

@Injectable()
export class PostgresqlPrismaOrmPsychologistRepository
  implements PsychologistDatabaseRepository
{
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async createPsychologist(
    psychologist: CreatePsychologistInputDto,
  ): Promise<PsychologistEntity> {
    const isPsychologistExists = await this.findPsychologistByEmail(psychologist.email);

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS'],
      );
    }

    const toPrismaEntity =
      PostgresqlPrismaPsychologistMapper.toPrismaCreate(psychologist);

    const newPsychologist =
      await this.postgreSqlPrismaOrmService['psychologist'].create(toPrismaEntity);

    return PostgresqlPrismaPsychologistMapper.toDomain(newPsychologist);
  }

  async findPsychologistByEmail(email: string): Promise<PsychologistEntity | null> {
    const psychologist = await this.postgreSqlPrismaOrmService['psychologist'].findUnique(
      {
        where: {
          email: email,
        },
      },
    );

    if (!psychologist) {
      return null;
    }

    return PostgresqlPrismaPsychologistMapper.toDomain(psychologist);
  }

  async findPsychologistById(id: string): Promise<PsychologistEntity | null> {
    const psychologist = await this.postgreSqlPrismaOrmService['psychologist'].findUnique(
      {
        where: {
          id: id,
        },
      },
    );

    if (!psychologist) {
      return null;
    }

    return PostgresqlPrismaPsychologistMapper.toDomain(psychologist);
  }

  async getPsychologists(): Promise<PsychologistEntity[]> {
    const psychologists =
      await this.postgreSqlPrismaOrmService['psychologist'].findMany();

    return PostgresqlPrismaPsychologistMapper.toDomainMany(psychologists);
  }

  async updatePsychologist(newPsychologist: UpdatePsychologistInputDto): Promise<void> {
    const oldPsychologist = await this.findPsychologistById(newPsychologist.id);

    if (!oldPsychologist) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const toPrismaEntity =
      PostgresqlPrismaPsychologistMapper.toPrismaUpdate(newPsychologist);

    await this.postgreSqlPrismaOrmService['psychologist'].update(toPrismaEntity);
  }

  async deletePsychologist(email: string) {
    const psychologist = await this.postgreSqlPrismaOrmService['psychologist'].findUnique(
      {
        where: { email: email },
        include: { clinic: true }, // Inclui as clínicas associadas
      },
    );

    if (!psychologist) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const clinicNames = psychologist.clinic.map((clinic) => {
      return { name: clinic.name, id: clinic.id };
    });

    const deletedPsychologist = await this.postgreSqlPrismaOrmService[
      'psychologist'
    ].delete({
      where: {
        email: email,
      },
    });

    // Retorna as informações requeridas
    const responseObject = {
      deletedPsychologist:
        PostgresqlPrismaPsychologistMapper.toDomain(deletedPsychologist),
      associatedClinics: clinicNames,
    };

    return responseObject;
  }
}
