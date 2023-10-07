import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryPatientDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientService } from './delete-patient.service';

describe('[patient] Delete Patient Service', () => {
  const fakePatient = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    CPF: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    phone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  let service: DeletePatientService;
  let databaseRepository: PatientDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePatientService,
        {
          provide: PatientDatabaseRepository,
          useClass: InMemoryPatientDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<DeletePatientService>(DeletePatientService);
    databaseRepository = module.get<PatientDatabaseRepository>(
      PatientDatabaseRepository
    );
  });

  it('should delete a new patient', async () => {
    const createPatient = await databaseRepository.createPatient(fakePatient);

    await service.execute(createPatient.email);

    const getPatients = await databaseRepository.getPatients();

    expect(getPatients).not.toContain(createPatient);
  });

  it('should throw conflict exception if patient do not exist', async () => {
    await expect(service.execute(fakePatient.email)).rejects.toThrow(
      ConflictException
    );
  });
});
