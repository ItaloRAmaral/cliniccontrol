import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { fakerPT_BR as faker } from '@faker-js/faker';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';

describe('[E2E] -  Authenticate Psychologist', () => {
  let app: INestApplication;

  let psychologist: PsychologistEntity;
  let password: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;

    psychologist = setup.psychologist;
    password = setup.password;
  });

  it('[POST] - Should successfully authenticate a psychologist', async () => {
    const response = await request(app.getHttpServer()).post('/psychologist/login').send({
      email: psychologist.email,
      password,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      user: {
        id: psychologist.id,
        name: psychologist.name,
        email: psychologist.email,
      },
      access_token: expect.any(String),
    });
  });

  it('[POST] - Should return an error 401 when trying to authenticate with wrong password', async () => {
    const response = await request(app.getHttpServer())
      .post('/psychologist/login')
      .send({
        email: psychologist.email,
        password: faker.internet.password({ length: 3 }),
      });

    expect(response.statusCode).toBe(401);
  });

  it('[POST] - Should return an error 401 when trying to authenticate with wrong email', async () => {
    const password = faker.internet.password({ length: 8 });

    const response = await request(app.getHttpServer()).post('/psychologist/login').send({
      email: 'user_not_exist@email.com',
      password,
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('psychologist not found');
  });
});
