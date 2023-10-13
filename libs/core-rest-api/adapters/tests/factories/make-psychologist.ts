import { Injectable } from '@nestjs/common';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import {
  Plan,
  Role,
} from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import { PostgreSqlPrismaOrmService } from '../../src/database/infra/prisma/prisma.service';
import { PostgresqlPrismaPsychologistMapper } from '../../src/database/mappers/postgresql-prisma-psychologist-mapper';
import { generateRandomPassword } from '../utils/random-password';

/*
  Criando uma factory para a entidade Psychologist, que será utilizada para criar testes dos casos de uso do domínio
*/
export function makePsychologist(
  override: Partial<CreatePsychologistDto> = {}
): PsychologistEntity {
  const newPsychologist = new PsychologistEntity({
    name: 'Novo Usuário Teste',
    email: 'novo_usuario_teste@gmail.com',
    password: generateRandomPassword(8),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
    ...override,
  });

  return newPsychologist;
}

/*
  Criando uma factory para a entidade Psychologist do Prisma, que será utilizada para criar testes e2e (controllers)
*/
@Injectable()
export class PsychologistFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity> {
    const newPrismaPsychologist = makePsychologist(psychologist);

    await this.postgreSqlPrismaOrmService.psychologist.create(
      PostgresqlPrismaPsychologistMapper.toPrismaCreate(newPrismaPsychologist)
    );

    return newPrismaPsychologist;
  }
}
