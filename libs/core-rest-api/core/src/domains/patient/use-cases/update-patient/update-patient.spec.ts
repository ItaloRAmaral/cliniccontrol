import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryPatientDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { CreatePatientDto } from '../create-patient/create-patient-dto';
import { UpdatePatientDto } from './update-patient-dto';
import { UpdatePatientService } from './update-patient.service';

describe('[patient] Update Patient Service', () => {
  const fakePatient: CreatePatientDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    CPF: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    phone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  let service: UpdatePatientService;
  let databaseRepository: PatientDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePatientService,
        {
          provide: PatientDatabaseRepository,
          useClass: InMemoryPatientDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<UpdatePatientService>(UpdatePatientService);
    databaseRepository = module.get<PatientDatabaseRepository>(
      PatientDatabaseRepository
    );
  });

  it('should update a patient', async () => {
    const createPatient = await databaseRepository.createPatient(fakePatient);

    const newPatientInfos: UpdatePatientDto = {
      id: createPatient.id,
      email: faker.internet.email(),
      paymentMethod: PaymentMethod.PIX,
      phone: '+55 11 911112111',
    };

    await service.execute(newPatientInfos);

    const findPatient = await databaseRepository.findPatientById(
      createPatient.id
    );

    expect(findPatient).toEqual({
      ...createPatient,
      ...newPatientInfos,
    });

    expect(findPatient?.email).not.toBe(fakePatient.email);
    expect(findPatient?.email).toBe(newPatientInfos.email);

    expect(findPatient?.paymentMethod).toBe(newPatientInfos.paymentMethod);
    expect(findPatient?.paymentMethod).not.toBe(fakePatient.paymentMethod);

    expect(findPatient?.phone).not.toBe(fakePatient.phone);
    expect(findPatient?.phone).toBe(newPatientInfos.phone);
  });

  it('should throw conflict exception if patient do not exist', async () => {
    const newPatientInfos = {
      id: randomUUID(),
      email: faker.internet.email(),
      paymentMethod: PaymentMethod.PIX,
    };

    await expect(service.execute(newPatientInfos)).rejects.toThrow(
      new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND'])
    );
  });
});
