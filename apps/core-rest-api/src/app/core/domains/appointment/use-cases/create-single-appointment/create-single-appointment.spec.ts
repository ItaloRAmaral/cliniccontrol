import { fakerPT_BR as faker } from '@faker-js/faker';
import { CreateSingleAppointmentService } from './create-single-appointment.service';

import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryAppointmentDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentDto } from './create-single-appointment-dto';

describe('[appointment] Create Single Appointment Service', () => {
  const fakeAppointment: CreateSingleAppointmentDto = {
    psychologistId: randomUUID(),
    patientId: randomUUID(),
    date: faker.date.recent({ days: 10 }),
    online: false,
    clinicId: randomUUID(),
    confirmed: true,
    confirmationDate: faker.date.recent({ days: 5 }),
    cancelled: false,
    paymentMethod: PaymentMethod.CREDIT_CARD,
  };

  let service: CreateSingleAppointmentService;
  let databaseRepository: AppointmentDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryAppointmentDatabaseRepository();
    service = new CreateSingleAppointmentService(databaseRepository);
  });

  it('should create a new appointment', async () => {
    const createAppointment = await service.execute(fakeAppointment);

    const appointment = await databaseRepository.findSingleAppointmentByDate(
      createAppointment.date
    );

    expect(appointment?.id).toEqual(appointment?.id);
    expect(createAppointment.patientId).toEqual(fakeAppointment.patientId);
    expect(createAppointment.psychologistId).toEqual(
      fakeAppointment.psychologistId
    );
  });

  it('should not create a new appointment if the date is already taken', async () => {
    await service.execute(fakeAppointment);

    await expect(service.execute(fakeAppointment)).rejects.toThrowError(
      ConflictException
    );
  });
});
