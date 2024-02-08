import { fakerPT_BR as faker } from '@faker-js/faker';

import { PaymentMethod, Plan, Role } from '../../../../shared/interfaces/payments';
import { PatientEntity } from '../../../patient/entities/patient/entity';
import { CreatePatientDto } from '../../../patient/use-cases/create-patient/create-patient-dto';
import { PsychologistEntity } from '../../../psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '../../../psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { PatientAppointmentRegistryEntity } from '../../entities/registry/entity';
import { InMemoryPatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePatientAppointmentRegistryDto } from './update-appointment-registry-dto';
import { UpdatePatientAppointmentRegistryService } from './update-appointment-registry.service';

describe('[registry] - Update Patient Appointment Registry Service', () => {
  const fakePsychologist: CreatePsychologistDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
  };

  let service: UpdatePatientAppointmentRegistryService;
  let databaseRepository: PatientAppointmentRegistryDatabaseRepository;

  let psychologist: PsychologistEntity;
  let patient: PatientEntity;
  let patientAppointmentRegistry: PatientAppointmentRegistryEntity;

  beforeAll(async () => {
    databaseRepository = new InMemoryPatientAppointmentRegistryDatabaseRepository();
    service = new UpdatePatientAppointmentRegistryService(databaseRepository);

    psychologist = new PsychologistEntity(fakePsychologist);

    const fakePatient: CreatePatientDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
      telephone: '+55 11 911111111',
      paymentMethod: PaymentMethod.CREDIT_CARD,
      psychologistId: psychologist.id,
      clinicId: faker.string.uuid(),
    };

    patient = new PatientEntity(fakePatient);

    const registry = {
      observations: faker.lorem.paragraph(),
    };

    const newPatientAppointmentRegistry = {
      registry: registry,
      psychologistId: psychologist.id,
      patientId: patient.id,
    };

    patientAppointmentRegistry =
      await databaseRepository.createPatientAppointmentRegistry(
        newPatientAppointmentRegistry,
      );
  });

  it('should update a appointment patient registry', async () => {
    const newRegistryInfo = {
      observations: faker.lorem.paragraph(),
    };

    const updatedPatientAppointmentRegistry: UpdatePatientAppointmentRegistryDto = {
      id: patientAppointmentRegistry.id,
      registry: newRegistryInfo,
    };

    await service.execute(updatedPatientAppointmentRegistry);

    const updatedPatientAppointmentRegistryFromDatabase =
      await databaseRepository.findPatientAppointmentRegistryById(
        updatedPatientAppointmentRegistry.id,
      );

    expect(updatedPatientAppointmentRegistryFromDatabase?.registry.observations).toEqual(expect.any(String))
    expect(updatedPatientAppointmentRegistryFromDatabase?.updatedAt).toBeDefined()
  });
});
