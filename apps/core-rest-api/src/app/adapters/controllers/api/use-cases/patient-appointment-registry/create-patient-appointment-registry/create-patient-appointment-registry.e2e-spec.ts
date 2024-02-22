import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { Registry } from '../../../../../../core/domains/patient-appointment-registry/entities/registry/dto';
import { CreatePatientAppointmentRegistryInputDto } from '../../../../../../core/domains/patient-appointment-registry/use-cases/create-appointment-registry/create-appointment-registry-dto';
import { PatientEntity } from '../../../../../../core/domains/patient/entities/patient/entity';
import { PsychologistEntity } from '../../../../../../core/domains/psychologist/entities/psychologist/entity';

describe('[E2E] - Create Appointment Registry', () => {
  let app: INestApplication;

  let access_token: string;

  let patient: PatientEntity;
  let psychologist: PsychologistEntity;
  let registry: Registry;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;

    access_token = setup.access_token;

    patient = setup.patient;
    psychologist = setup.psychologist;

    registry = {
      observations: 'Patient is doing well',
    };
  });

  it('[POST] - Should successfully create a new registry', async () => {
    const appointmentRegistry: CreatePatientAppointmentRegistryInputDto = {
      patientId: patient.id,
      psychologistId: psychologist.id,
      registry,
    };

    const createdPatientAppointmentRegistry = await request(app.getHttpServer())
      .post('/appointment-registry/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(appointmentRegistry);

    expect(createdPatientAppointmentRegistry.statusCode).toBe(201);
    expect(createdPatientAppointmentRegistry.body.message).toBe(
      'Appointment registry created successfully',
    );
  });

  it('[POST] - Should return an error when trying to create a registry with an invalid patient id', async () => {
    const appointmentRegistry: CreatePatientAppointmentRegistryInputDto = {
      patientId: 'invalid_patient_id',
      psychologistId: psychologist.id,
      registry,
    };

    const createdPatientAppointmentRegistry = await request(app.getHttpServer())
      .post('/appointment-registry/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(appointmentRegistry);

    expect(createdPatientAppointmentRegistry.statusCode).toBe(409);
    expect(createdPatientAppointmentRegistry.body.message).toBe('patient not found');
  });

  it('[POST] - Should return an error when trying to create a registry with an invalid psychologist id', async () => {
    const appointmentRegistry: CreatePatientAppointmentRegistryInputDto = {
      patientId: patient.id,
      psychologistId: 'invalid_psychologist_id',
      registry,
    };

    const createdPatientAppointmentRegistry = await request(app.getHttpServer())
      .post('/appointment-registry/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(appointmentRegistry);

    expect(createdPatientAppointmentRegistry.statusCode).toBe(409);
    expect(createdPatientAppointmentRegistry.body.message).toBe('psychologist not found');
  });

  it('[POST] - Should return an error when trying to create a registry without token', async () => {
    const appointmentRegistry: CreatePatientAppointmentRegistryInputDto = {
      patientId: patient.id,
      psychologistId: psychologist.id,
      registry,
    };

    const createdPatientAppointmentRegistry = await request(app.getHttpServer())
      .post('/appointment-registry/create')
      .send(appointmentRegistry);

    expect(createdPatientAppointmentRegistry.statusCode).toBe(401);
    expect(createdPatientAppointmentRegistry.body.message).toBe('Invalid JWT token');
  });
});
