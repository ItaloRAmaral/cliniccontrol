import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { fakerPT_BR as faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';

import { DatabaseRepositoriesModule } from '@clinicControl/core-rest-api/adapters/src/database/repositories/repositories.module';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { ApiModule } from '../../../api.module';

describe('[E2E] -  Authenticate Psychologist', () => {
  let app: INestApplication;
  let psychologistFactory: PsychologistFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule, DatabaseRepositoriesModule],
      providers: [PsychologistFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    psychologistFactory = moduleRef.get(PsychologistFactory);

    await app.init();
  });

  it('[POST] - Should successfully authenticate a psychologist', async () => {
    const password = faker.internet.password({ length: 8 });
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      password: await hash(password, 8),
    });

    const response = await request(app.getHttpServer()).post('/psychologist/login').send({
      email: newPsychologist.email,
      password,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: newPsychologist.id,
      name: newPsychologist.name,
      email: newPsychologist.email,
      access_token: expect.any(String),
    });
  });

  it('[POST] - Should return an error 401 when trying to authenticate with wrong password', async () => {
    const password = faker.internet.password({ length: 8 });
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      password: await hash(password, 8),
      email: 'new_user_entrie@email.com',
    });

    const response = await request(app.getHttpServer())
      .post('/psychologist/login')
      .send({
        email: newPsychologist.email,
        password: faker.internet.password({ length: 3 }),
      });

    expect(response.statusCode).toBe(401);
  });

  it('[POST] - Should return an error 401 when trying to authenticate with wrong password', async () => {
    const password = faker.internet.password({ length: 8 });

    const response = await request(app.getHttpServer()).post('/psychologist/login').send({
      email: 'user_not_exist@email.com',
      password,
    });

    expect(response.statusCode).toBe(401);
  });
});
