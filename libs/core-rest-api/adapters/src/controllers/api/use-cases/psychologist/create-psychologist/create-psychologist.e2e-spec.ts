import { fakerPT_BR as faker } from '@faker-js/faker';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { makePsychologist } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Create Psychologist Account', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  let psychologist: PsychologistEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;
    prisma = setup.prisma;

    psychologist = setup.psychologist;
  });

  it('[POST] - Should return an error when trying to create a new psychologist that already exists', async () => {
    // // const newPsychologist = makePsychologist({
    // //   email: 'novo_usuario_teste_new_entrie@gmail.com',
    // // });

    // const response = await request(app.getHttpServer())
    //   .post('/psychologist/create')
    //   .set('api-key', 'api-key')
    //   .send(psychologist);

    // expect(response.statusCode).toBe(201);

    // const userOnDatabase = await prisma.psychologist.findUnique({
    //   where: {
    //     email: 'novo_usuario_teste_new_entrie@gmail.com',
    //   },
    // });

    // expect(userOnDatabase).toBeTruthy();

    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send(psychologist);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('psychologist already exists');
  });

  it('[POST] - Should successfully create a new psychologist account', async () => {
    const newPsychologist = makePsychologist({ email: faker.internet.email() });

    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send(newPsychologist);

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.psychologist.findUnique({
      where: {
        email: newPsychologist.email,
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });

  it('[POST] - Should return an error when trying to create a new psychologist without api-key', async () => {
    const newPsychologist = makePsychologist({
      email: 'novo_usuario_teste_not_created@gmail.com',
    });

    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .send(newPsychologist);

    expect(response.statusCode).toBe(401);

    const userOnDatabase = await prisma.psychologist.findUnique({
      where: {
        email: 'novo_usuario_teste_not_created@gmail.com',
      },
    });

    expect(userOnDatabase).toBeFalsy();
    expect(response.body.message).toBe('API key is missing');
  });
});
