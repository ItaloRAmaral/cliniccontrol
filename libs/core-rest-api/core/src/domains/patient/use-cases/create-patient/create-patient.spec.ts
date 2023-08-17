import { faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientService } from './create-patient.service';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { InMemoryPatientDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { randomUUID } from 'crypto';
import { CreatePatientDto } from './create-patient-dto';

describe('[patient] Create Patient Service', () => {
  const fakePatient: CreatePatientDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    CPF:  (faker.number.int({ min: 0, max: 10000000000 })).toString(),
    phone: 5548999999999,
    paymentMethod: 'debit',
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  }

  let service: CreatePatientService
  let databaseRepository: PatientDatabaseRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePatientService,
        {
          provide: PatientDatabaseRepository,
          useClass: InMemoryPatientDatabaseRepository
        }
      ]
    }).compile();

    service = module.get<CreatePatientService>(CreatePatientService);
    databaseRepository = module.get<PatientDatabaseRepository>(
      PatientDatabaseRepository
    );
  })

  it('should create a new patient', async () => {
    const patient = await service.execute(fakePatient);

    const patientDatabaseRepository = await databaseRepository.findPatient(patient.email)
    expect(patientDatabaseRepository?.email).toEqual(patient.email);
    expect(patient.email).toEqual(fakePatient.email);
  });

  it('should throw conflict exception if email already exists', async () => {
    await service.execute(fakePatient);

    await expect(service.execute(fakePatient)).rejects.toThrow(ConflictException);
  });
})
