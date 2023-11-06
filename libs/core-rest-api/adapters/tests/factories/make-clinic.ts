import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { PostgreSqlPrismaOrmService } from '../../src/database/infra/prisma/prisma.service';
import { PostgresqlPrismaClinicMapper } from '../../src/database/mappers/postgresql-prisma-clinic-mapper';

/*
  Creating a factory for the Clinic entity, which will be used to create tests for the domain's use cases
*/
export function makeClinic(
  psychologistId?: string,
  override: Partial<CreateClinicDto> = {}
): ClinicEntity {
  const newClinic = new ClinicEntity({
    name: 'Nova Clinica',
    city: faker.location.city(),
    state: faker.location.state(),
    psychologistId: psychologistId ?? '',
    ...override,
  });

  return newClinic;
}

/*
  Creating a factory for Prisma's Clinic entity, which will be used to create e2e tests (controllers)
*/
@Injectable()
export class ClinicFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaClinic(
    clinic: CreateClinicDto
  ): Promise<ClinicEntity> {
    const newPrismaClinic = makeClinic(clinic.psychologistId, clinic);

    await this.postgreSqlPrismaOrmService['clinic'].create(
      PostgresqlPrismaClinicMapper.toPrismaCreate(newPrismaClinic)
    );

    return newPrismaClinic;
  }
}
