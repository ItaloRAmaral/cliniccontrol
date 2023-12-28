import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { InMemoryPatientDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { CreatePatientDto } from './create-patient-dto';
import { CreatePatientService } from './create-patient.service';

describe('[patient] Create Patient Service', () => {
  const fakePatient: CreatePatientDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    telephone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  let service: CreatePatientService;
  let databaseRepository: PatientDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryPatientDatabaseRepository();
    service = new CreatePatientService(databaseRepository);
  });

  it('should create a new patient', async () => {
    const patient = await service.execute(fakePatient);

    const patientDatabaseRepository = await databaseRepository.findPatientByEmail(
      patient.email,
    );
    expect(patientDatabaseRepository?.email).toEqual(patient.email);
    expect(patient.email).toEqual(fakePatient.email);
  });

  it('should throw conflict exception if email already exists', async () => {
    await service.execute(fakePatient);

    await expect(service.execute(fakePatient)).rejects.toThrow(ConflictException);
  });
});
