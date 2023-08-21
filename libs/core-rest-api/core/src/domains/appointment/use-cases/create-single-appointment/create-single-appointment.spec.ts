import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateSingleAppointmentService } from './create-appointment.service';

import { randomUUID } from 'crypto';
import { InMemoryAppointmentDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentDto } from './create-appointment-dto';

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
    paymentMethod: 'debit',
  };

  let service: CreateSingleAppointmentService;
  let databaseRepository: AppointmentDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSingleAppointmentService,
        {
          provide: AppointmentDatabaseRepository,
          useClass: InMemoryAppointmentDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<CreateSingleAppointmentService>(
      CreateSingleAppointmentService
    );
    databaseRepository = module.get<AppointmentDatabaseRepository>(
      AppointmentDatabaseRepository
    );
  });

  it('should create a new appointment', async () => {
    const createAppointment = await service.execute(fakeAppointment);

    const appointment = await databaseRepository.findSingleAppointment(
      createAppointment.date
    );

    expect(appointment?.id).toEqual(appointment?.id);
    expect(createAppointment.patientId).toEqual(fakeAppointment.patientId);
    expect(createAppointment.psychologistId).toEqual(
      fakeAppointment.psychologistId
    );
  });
});
