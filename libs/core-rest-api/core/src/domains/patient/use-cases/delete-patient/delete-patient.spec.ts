import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { PatientEntity } from '../../entities/patient/entity';
import { InMemoryPatientDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientDto } from './delete-patient-dto';
import { DeletePatientService } from './delete-patient.service';

describe('[patient] Delete Patient Service', () => {
  const fakePatient = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    telephone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  let service: DeletePatientService;
  let databaseRepository: PatientDatabaseRepository;

  let patient: PatientEntity;
  let deletePatientDto: DeletePatientDto;

  beforeAll(async () => {
    databaseRepository = new InMemoryPatientDatabaseRepository();
    service = new DeletePatientService(databaseRepository);

    const patient = await databaseRepository.createPatient(fakePatient);

    deletePatientDto = {
      patientId: patient.id,
      psychologistId: patient.psychologistId,
    };
  });

  it('should delete a new patient', async () => {
    await service.execute(deletePatientDto);

    const getPatients = await databaseRepository.getPatients();

    expect(getPatients).not.toContain(patient);
  });

  it('should throw conflict exception if patient do not exist', async () => {
    await expect(service.execute(deletePatientDto)).rejects.toThrow(ConflictException);
  });
});
