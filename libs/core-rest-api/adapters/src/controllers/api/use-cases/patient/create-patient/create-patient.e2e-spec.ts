import request from 'supertest';

import { PatientEntity } from '@clinicControl/core-rest-api/core/src/domains/patient/entities/patient/entity';
import { CreatePatientDto } from '@clinicControl/core-rest-api/core/src/domains/patient/use-cases/create-patient/create-patient-dto';
import { INestApplication } from '@nestjs/common';
import { makePatient } from '../../../../../../tests/factories/make-patient';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Create New Patient', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  let access_token: string;

  let psychologistId: string;
  let clinicId: string;

  let patient: PatientEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;
    prisma = setup.prisma;

    access_token = setup.access_token;

    clinicId = setup.clinic.id;
    psychologistId = setup.psychologist.id;

    patient = setup.patient;
  });

  it('[POST] - Should successfully create a new patient account', async () => {
    const newPatient: CreatePatientDto = makePatient({
      email: 'new_patient@email.com',
      psychologistId,
      clinicId,
    });

    const response = await request(app.getHttpServer())
      .post('/patient/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(newPatient);

    console.log('CREATE PATIENT --------->', response.body);

    const patientOnDatabase = await prisma.patient.findUnique({
      where: {
        email: newPatient.email,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Patient created successfully');
    expect(patientOnDatabase).toBeTruthy();
  });

  it('[POST] - Should return an error when trying to create a patient that already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(patient);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('patient already exists');
  });

  it('[POST] - Should return an error when trying to create a new patient without token', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/create')
      .send(patient);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[POST] - Should return an error when trying to create a new patient without body request', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/create')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).deep.equals([
      'name must be a string',
      'email must be a string',
      'cpf must be a string',
      'telephone must be a phone number',
      'paymentMethod must be one of the following values: CREDIT_CARD, DEBIT_CARD, PIX, MONEY, HEALTH_INSURANCE, OTHER',
      'psychologistId must be a string',
      'clinicId must be a string',
    ]);
  });
});
