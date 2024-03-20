import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PostgreSqlPrismaOrmService } from '../../src/app/adapters/database/infra/prisma/prisma.service';

import { AppointmentEntity } from '../../src/app/core/domains/appointment/entities/appointment/entity';
import { CreateSingleAppointmentInputDto } from '../../src/app/core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { PaymentMethod } from '../../src/app/core/shared/interfaces/payments';

export function makeAppointment(
  override: Partial<CreateSingleAppointmentInputDto> = {},
): AppointmentEntity {
  const newAppointment = new AppointmentEntity({
    psychologistId: faker.string.uuid(),
    patientId: faker.string.uuid(),
    date: faker.date.future(),
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
    appointment: Partial<CreateSingleAppointmentInputDto> = {},
  ): Promise<AppointmentEntity> {
    try {
      const newPrismaAppointment = makeAppointment(appointment);
      console.log('newPrismaAppointment', newPrismaAppointment)

      await this.postgreSqlPrismaOrmService['appointment'].create({
        data: {
          patientId: newPrismaAppointment.patientId,
          psychologistId: newPrismaAppointment.psychologistId,
          id: newPrismaAppointment.id,
          clinicId: newPrismaAppointment.clinicId,
          date: newPrismaAppointment.date,
        }
      }
    )

    return newPrismaAppointment;
    } catch (e) {
      console.log( 'ERROR-----', e)
    }

  }
}
