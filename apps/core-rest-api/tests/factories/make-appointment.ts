import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PostgreSqlPrismaOrmService } from '../../src/app/adapters/database/infra/prisma/prisma.service';

import { PostgresqlPrismaAppointmentMapper } from '../../src/app/adapters/database/mappers/postgresql-prisma-appointment-mapper';
import { AppointmentEntity } from '../../src/app/core/domains/appointment/entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../../src/app/core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { PaymentMethod } from '../../src/app/core/shared/interfaces/payments';

export function makeAppointment(override: Partial<CreateSingleAppointmentDto> = {}): AppointmentEntity {
  const newAppointment = new AppointmentEntity({
    psychologistId: faker.string.uuid(),
    patientId: faker.string.uuid(),
    date: (faker.date.future()).toString(),
    online: false,
    clinicId: faker.string.uuid(),
    confirmed: true,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    cancelled: false,
    ...override,
  });

  return newAppointment;
}

@Injectable()
export class AppointmentFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaAppointment(
    appointment: Partial<CreateSingleAppointmentDto> = {},
  ): Promise<AppointmentEntity> {
    const newPrismaAppointment = makeAppointment(appointment);

    await this.postgreSqlPrismaOrmService['appointment'].create(
      PostgresqlPrismaAppointmentMapper.toPrismaCreate({...newPrismaAppointment, date: (newPrismaAppointment.date).toString()}),
    );

    return newPrismaAppointment;
  }
}
