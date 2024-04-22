import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { makeClinic } from '../../../../../../../../tests/factories/make-clinic';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { ClinicEntity } from '../../../../../../core/domains/clinic/entities/clinic/entity';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe('[E2E] - Create Clinic', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;
  let psychologistId: string;
  let access_token: string;
  let clinic: ClinicEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    app = setup.app;
    prisma = setup.prisma;
    psychologistId = setup.psychologist.id;
    access_token = setup.access_token;
    clinic = makeClinic(psychologistId);
  });

  it('[POST] - Should successfully create a new clinic', async () => {
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(clinic);

    const clinicOnDatabase = await prisma.clinic.findUnique({
      where: {
        id: clinic.id,
        psychologistId
      },
    });

    expect(createdClinicResponse.statusCode).toBe(201);
    expect(createdClinicResponse.body).toEqual({
      ...clinicOnDatabase,
      createdAt: clinicOnDatabase?.createdAt.toISOString(),
      updatedAt: clinicOnDatabase?.updatedAt.toISOString(),
    });
  });

  it('[POST] - Should unsuccessfully try to create a new clinic without token', async () => {
    const newClinic = makeClinic(psychologistId);

    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .send(newClinic);

    expect(createdClinicResponse.statusCode).toBe(401);
    expect(createdClinicResponse.body.message).toBe('Invalid JWT token');
  });

  it('[POST] - Should unsuccessfully try to create a new clinic without body request', async () => {
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`);

    expect(createdClinicResponse.statusCode).toBe(400);

    expect(createdClinicResponse.body.message).toEqual([
      "name must be a string",
      "psychologistId must be a string",
      "city must be a string",
      "state must be a string"
    ]);
    expect(createdClinicResponse.text).toBe(
      '{"message":["name must be a string","psychologistId must be a string","city must be a string","state must be a string"],"error":"Bad Request","statusCode":400}'
    );
  });

  it('[POST] - Should unsuccessfully try to create a clinic that already exists', async () => {
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(clinic);

    expect(createdClinicResponse.statusCode).toBe(409);
    expect(createdClinicResponse.body.message).toBe('clinic already exists');
  });

  it('[POST] - Should unsuccessfully try to create a clinic with an invalid psychologist Id', async () => {
    clinic = makeClinic('invalid-psychologist-id');
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(clinic);

    expect(createdClinicResponse.statusCode).toBe(400);
    expect(createdClinicResponse.body.message).contain(
      "Invalid `this.postgreSqlPrismaOrmService['clinic'].create()`"
    );
  });
});
