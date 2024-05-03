import { faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryAppointmentDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentInputDto } from '../create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentDateInputDto } from './update-appointment-date-dto';
import { UpdateAppointmentDateService } from './update-appointment-date.service';

describe('[appointment] Update Appointment Info Service', () => {
  const fakeAppointment: CreateSingleAppointmentInputDto = {
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

  let service: UpdateAppointmentDateService;
  let databaseRepository: AppointmentDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryAppointmentDatabaseRepository();
    service = new UpdateAppointmentDateService(databaseRepository);
  });

  it('should update an appointment', async () => {
    const createAppointment =
      await databaseRepository.createSingleAppointment(fakeAppointment);

    const newAppointmentInfo: UpdatedAppointmentDateInputDto = {
      date: new Date(),
      id: createAppointment.id,
    };

    await service.execute(newAppointmentInfo);
    const findAppointment = await databaseRepository.findSingleAppointmentById(
      newAppointmentInfo.id,
    );

    expect(findAppointment).toEqual({
      ...createAppointment,
      ...newAppointmentInfo,
    });

    expect(findAppointment?.date).toBe(newAppointmentInfo.date);

    expect(findAppointment?.date).not.toBe(fakeAppointment.date);
  });

  it('should throw error if appointment does not exist', async () => {
    const newAppointmentDate: UpdatedAppointmentDateInputDto = {
      id: randomUUID(),
      date: new Date(),
    };

    await expect(service.execute(newAppointmentDate)).rejects.toThrow(
      new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']),
    );
  });
});
