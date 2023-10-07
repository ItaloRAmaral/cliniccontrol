import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryAppointmentDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentDto } from '../create-single-appointment/create-single-appointment-dto';
import { DeleteSingleAppointmentService } from './delete-single-appointment.service';

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

  let service: DeleteSingleAppointmentService;
  let databaseRepository: AppointmentDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteSingleAppointmentService,
        {
          provide: AppointmentDatabaseRepository,
          useClass: InMemoryAppointmentDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteSingleAppointmentService>(
      DeleteSingleAppointmentService
    );
    databaseRepository = module.get<AppointmentDatabaseRepository>(
      AppointmentDatabaseRepository
    );
  });

  it('should delete a new appointment', async () => {
    const createAppointment = await databaseRepository.createSingleAppointment(
      fakeAppointment
    );
    await service.execute(createAppointment.id);
    const getAppointments = await databaseRepository.getAppointments();

    expect(getAppointments).not.toContain(createAppointment);
  });

  it('should throw error if appointment does not exist', async () => {
    const createAppointment = await databaseRepository.createSingleAppointment(
      fakeAppointment
    );
    await service.execute(createAppointment.id);
    await expect(service.execute(createAppointment.id)).rejects.toThrow(
      ConflictException
    );
  });
});
