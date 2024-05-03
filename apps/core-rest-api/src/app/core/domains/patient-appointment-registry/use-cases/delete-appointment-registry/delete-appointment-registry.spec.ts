import { fakerPT_BR as faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

import { PaymentMethod, Plan, Role } from '../../../../shared/interfaces/payments';

import { ClinicDatabaseRepository } from '../../../clinic/repositories/database-repository';
import { PatientDatabaseRepository } from '../../../patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../psychologist/repositories/database-repository';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';

import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
import { InMemoryPatientDatabaseRepository } from '../../../patient/repositories/database-in-memory-repository';
import { InMemoryPsychologistDatabaseRepository } from '../../../psychologist/repositories/database-in-memory-repository';
import { InMemoryPatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-in-memory-repository';

import { DeletePatientAppointmentRegistryService } from './delete-appointment-registry.service';

import { ConflictException } from '@nestjs/common';
import { PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { PatientEntity } from '../../../patient/entities/patient/entity';
import { CreatePatientInputDto } from '../../../patient/use-cases/create-patient/create-patient-dto';
import { PsychologistEntity } from '../../../psychologist/entities/psychologist/entity';
import { CreatePsychologistInputDto } from '../../../psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { CreatePatientAppointmentRegistryInputDto } from '../create-appointment-registry/create-appointment-registry-dto';

describe('[registry] - Create Patient Appointment Registry Service', () => {
  const fakePatient: CreatePatientInputDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    telephone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  const fakePsychologist: CreatePsychologistInputDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
  };

  let newPatientAppointmentRegistry: CreatePatientAppointmentRegistryInputDto;

  let psychologist: PsychologistEntity;
  let patient: PatientEntity;

  let psychologistDatabaseRepository: PsychologistDatabaseRepository;
  let patientDatabaseRepository: PatientDatabaseRepository;
  let clinicRepository: ClinicDatabaseRepository;

  let service: DeletePatientAppointmentRegistryService;
  let patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository;

  beforeAll(async () => {
    clinicRepository = new InMemoryClinicDatabaseRepository();
    psychologistDatabaseRepository = new InMemoryPsychologistDatabaseRepository(
      clinicRepository,
    );
    patientDatabaseRepository = new InMemoryPatientDatabaseRepository();

    patientAppointmentRegistryDatabaseRepository =
      new InMemoryPatientAppointmentRegistryDatabaseRepository();
    service = new DeletePatientAppointmentRegistryService(
      patientAppointmentRegistryDatabaseRepository,
    );

    psychologist =
      await psychologistDatabaseRepository.createPsychologist(fakePsychologist);
    patient = await patientDatabaseRepository.createPatient(fakePatient);

    const registry = {
      observations: faker.lorem.paragraph(),
    };

    newPatientAppointmentRegistry = {
      registry: registry,
      psychologistId: psychologist.id,
      patientId: patient.id,
    };
  });

  it('should delete a new patient appointment registry', async () => {
    const patientAppointmentRegistry =
      await patientAppointmentRegistryDatabaseRepository.createPatientAppointmentRegistry(
        {
          ...newPatientAppointmentRegistry,
        },
      );

    await service.execute({ id: patientAppointmentRegistry.id });

    const getRegistry =
      await patientAppointmentRegistryDatabaseRepository.findPatientAppointmentRegistryById(
        patientAppointmentRegistry.id,
      );
    expect(getRegistry).toBeNull();
  });

  it('should throw conflict exception if regristry does not exists', async () => {
    const patientAppointmentRegistry = {
      id: 'id-not-existent',
    };
    await expect(service.execute(patientAppointmentRegistry)).rejects.toThrow(
      new ConflictException(
        PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND'],
      ),
    );
  });
});
