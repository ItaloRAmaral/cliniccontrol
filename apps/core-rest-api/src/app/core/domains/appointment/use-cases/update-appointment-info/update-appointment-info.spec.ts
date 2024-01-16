import { fakerPT_BR as faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryAppointmentDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentDto } from '../create-single-appointment/create-single-appointment-dto';
import { UpdateAppointmentInfoDto } from './update-appointment-info-dto';
import { UpdateAppointmentInfoService } from './update-appointment-info.service';

describe('[appointment] Update Appointment Info Service', () => {
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

  let service: UpdateAppointmentInfoService;
  let databaseRepository: AppointmentDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryAppointmentDatabaseRepository();
    service = new UpdateAppointmentInfoService(databaseRepository);
  });

  it('should update an appointment', async () => {
    const createAppointment =
      await databaseRepository.createSingleAppointment(fakeAppointment);

    const newAppointmentInfo: UpdateAppointmentInfoDto = {
      id: createAppointment.id,
      paid: true,
      paymentMethod: PaymentMethod.PIX,
    };

    await service.execute(newAppointmentInfo);
    const findAppointment = await databaseRepository.findSingleAppointmentById(
      newAppointmentInfo.id,
    );

    expect(findAppointment).toEqual({
      ...createAppointment,
      ...newAppointmentInfo,
    });

    expect(findAppointment?.paid).toBe(newAppointmentInfo.paid);

    expect(findAppointment?.paymentMethod).toBe(newAppointmentInfo.paymentMethod);
    expect(findAppointment?.paymentMethod).not.toBe(fakeAppointment.paymentMethod);
  });

  it('should throw error if appointment does not exist', async () => {
    const newAppointmentInfo: UpdateAppointmentInfoDto = {
      id: randomUUID(),
      paid: true,
      paymentMethod: PaymentMethod.PIX,
    };

    await expect(service.execute(newAppointmentInfo)).rejects.toThrow(
      new NotFoundException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']),
    );
  });
});
