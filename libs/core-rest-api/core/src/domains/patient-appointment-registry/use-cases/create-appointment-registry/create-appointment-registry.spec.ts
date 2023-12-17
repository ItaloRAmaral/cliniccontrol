import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  PATIENT_ERROR_MESSAGES,
  PSYCHOLOGIST_ERROR_MESSAGES,
} from '../../../../shared/errors/error-messages';
import { PaymentMethod, Plan, Role } from '../../../../shared/interfaces/payments';

import { ClinicDatabaseRepository } from '../../../clinic/repositories/database-repository';
import { PatientDatabaseRepository } from '../../../patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../psychologist/repositories/database-repository';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';

import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
import { InMemoryPatientDatabaseRepository } from '../../../patient/repositories/database-in-memory-repository';
import { InMemoryPsychologistDatabaseRepository } from '../../../psychologist/repositories/database-in-memory-repository';
import { InMemoryPatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-in-memory-repository';

import { CreatePatientAppointmentRegistryService } from './create-appointment-registry.service';

import { PatientEntity } from '../../../patient/entities/patient/entity';
import { CreatePatientDto } from '../../../patient/use-cases/create-patient/create-patient-dto';
import { PsychologistEntity } from '../../../psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '../../../psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { CreatePatientAppointmentRegistryDto } from './create-appointment-registry-dto';

describe('[] - Create Patient Appointment Registry Service', () => {
  const fakePatient: CreatePatientDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    CPF: faker.number.int({ min: 0, max: 10000000000 }).toString(),
    phone: '+55 11 911111111',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    psychologistId: randomUUID(),
    clinicId: randomUUID(),
  };

  const fakePsychologist: CreatePsychologistDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
  };

  let newPatientAppointmentRegistry: CreatePatientAppointmentRegistryDto;

  let psychologist: PsychologistEntity;
  let patient: PatientEntity;

  let psychologistDatabaseRepository: PsychologistDatabaseRepository;
  let patientDatabaseRepository: PatientDatabaseRepository;
  let clinicRepository: ClinicDatabaseRepository;

  let service: CreatePatientAppointmentRegistryService;
  let patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository;

  beforeAll(async () => {
    clinicRepository = new InMemoryClinicDatabaseRepository();
    psychologistDatabaseRepository = new InMemoryPsychologistDatabaseRepository(
      clinicRepository
    );
    patientDatabaseRepository = new InMemoryPatientDatabaseRepository();

    patientAppointmentRegistryDatabaseRepository =
      new InMemoryPatientAppointmentRegistryDatabaseRepository();
    service = new CreatePatientAppointmentRegistryService(
      psychologistDatabaseRepository,
      patientDatabaseRepository,
      patientAppointmentRegistryDatabaseRepository
    );

    psychologist = await psychologistDatabaseRepository.createPsychologist(
      fakePsychologist
    );
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

  it('should create a new patient appointment registry', async () => {
    const patientAppointmentRegistry = await service.execute(
      newPatientAppointmentRegistry
    );

    expect(patientAppointmentRegistry).toBeDefined();
  });

  it('should throw conflict exception if patient does not exists', async () => {
    const patientNotExistParams = {
      ...newPatientAppointmentRegistry,
      patientId: randomUUID(),
    };

    await expect(service.execute(patientNotExistParams)).rejects.toThrow(
      new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND'])
    );
  });

  it('should throw conflict exception if psychologist does not exists', async () => {
    const psychologistNotExistParams = {
      ...newPatientAppointmentRegistry,
      psychologistId: randomUUID(),
    };

    await expect(service.execute(psychologistNotExistParams)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'])
    );
  });
});
