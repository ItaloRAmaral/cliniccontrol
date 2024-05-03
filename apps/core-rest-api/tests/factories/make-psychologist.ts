import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PostgreSqlPrismaOrmService } from '../../src/app/adapters/database/infra/prisma/prisma.service';
import { PostgresqlPrismaPsychologistMapper } from '../../src/app/adapters/database/mappers/postgresql-prisma-psychologist-mapper';
import { PsychologistEntity } from '../../src/app/core/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistInputDto } from '../../src/app/core/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { Plan, Role } from '../../src/app/core/shared/interfaces/payments';

/*
  Creating a factory for the Psychologist entity, which will be used to create tests for the domain's use cases
*/
export function makePsychologist(
  override: Partial<CreatePsychologistInputDto> = {},
): PsychologistEntity {
  const newPsychologist = new PsychologistEntity({
    name: 'Novo Usuário Teste',
    email: 'novo_usuario_teste@gmail.com',
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.BASIC,
    ...override,
  });

  return newPsychologist;
}

/*
  Creating a factory for Prisma's Psychologist entity, which will be used to create e2e tests (controllers)
*/
@Injectable()
export class PsychologistFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaPsychologist(
    psychologist: Partial<CreatePsychologistInputDto> = {},
  ): Promise<PsychologistEntity> {
    const newPrismaPsychologist = makePsychologist(psychologist);

    await this.postgreSqlPrismaOrmService['psychologist'].create(
      PostgresqlPrismaPsychologistMapper.toPrismaCreate(newPrismaPsychologist),
    );

    return newPrismaPsychologist;
  }
}
