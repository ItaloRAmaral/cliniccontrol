import { fakerPT_BR as faker } from '@faker-js/faker';
import request from 'supertest';

import { CreatePatientDto } from '@clinicControl/core-rest-api/core/src/domains/patient/use-cases/create-patient/create-patient-dto';
import { PaymentMethod } from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import { INestApplication } from '@nestjs/common';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Create New Patient', () => {
  let app: INestApplication;

  let access_token: string;

  let psychologistId: string;
  let clinicId: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;

    access_token = setup.access_token;

    clinicId = setup.clinic.id;
    psychologistId = setup.psychologist.id;
  });

  it('[POST] - Should successfully create a new patient account', async () => {
    const newPatient: CreatePatientDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: faker.number.int({ min: 0, max: 10000000000 }).toString(),
      telephone: '+55 11 911111111',
      paymentMethod: PaymentMethod.CREDIT_CARD,
      psychologistId: psychologistId,
      clinicId: clinicId,
    };

    const response = await request(app.getHttpServer())
      .post('/patient/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(newPatient);

    expect(response.statusCode).toBe(201);
  });
});
