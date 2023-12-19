import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PatientEntity } from '@clinicControl/core-rest-api/core/src/domains/patient/entities/patient/entity';
import { CreatePatientDto } from '@clinicControl/core-rest-api/core/src/domains/patient/use-cases/create-patient/create-patient-dto';
import { PaymentMethod } from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import { PostgreSqlPrismaOrmService } from '../../src/database/infra/prisma/prisma.service';
import { PostgresqlPrismaPatientMapper } from '../../src/database/mappers/postgresql-prisma-patient-mapper';

export function makePatient(override: Partial<CreatePatientDto> = {}): PatientEntity {
  const newPatient = new PatientEntity({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    telephone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: faker.string.uuid(),
    clinicId: faker.string.uuid(),
    ...override,
  });

  return newPatient;
}

@Injectable()
export class PatientFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaPatient(
    patient: Partial<CreatePatientDto> = {},
  ): Promise<PatientEntity> {
    const newPrismaPatient = makePatient(patient);

    await this.postgreSqlPrismaOrmService['patient'].create(
      PostgresqlPrismaPatientMapper.toPrismaCreate(newPrismaPatient),
    );

    return newPrismaPatient;
  }
}
