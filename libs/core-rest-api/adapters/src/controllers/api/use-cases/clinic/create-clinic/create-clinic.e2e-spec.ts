import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { makeClinic } from '@clinicControl/root/libs/core-rest-api/adapters/tests/factories/make-clinic';
import { makePsychologist } from '@clinicControl/root/libs/core-rest-api/adapters/tests/factories/make-psychologist';
import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { ApiModule } from '../../../api.module';

describe('[E2E] - Create Clinic', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PostgreSqlPrismaOrmService);

    await app.init();
  });

  it('[POST] - Should successfully create a new clinic', async () => {
    const password = faker.internet.password({ length: 8 });
    const newPsychologist = makePsychologist({password: await hash(password, 8)});

    await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send(newPsychologist);

    const createdPsychologist = await prisma.psychologist.findUnique({
      where: {
        email: 'novo_usuario_teste@gmail.com',
      },
    });

    const login = await request(app.getHttpServer())
      .post('/psychologist/login')
      .send({
        email: newPsychologist.email,
        password,
      });

    console.log('login', login.body.access_token)
    const newClinic = makeClinic(createdPsychologist?.id);

    const response = await request(app.getHttpServer())
      .post('/clinic/create')
      .send(newClinic);

    expect(response.statusCode).toBe(201);
  });
});
