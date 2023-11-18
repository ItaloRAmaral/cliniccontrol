import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { makeClinic } from '../../../../../../tests/factories/make-clinic';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../../../../database/repositories/repositories.module';
import { ApiModule } from '../../../api.module';

describe('[E2E] - Create Clinic', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;
  let psychologistFactory: PsychologistFactory;
  let jwt: JwtService;
  let psychologistId: string;
  let access_token: string;
  let invalid_access_token: string;
  let psychologist: PsychologistEntity;
  let password: string;
  let clinic: ClinicEntity;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule, DatabaseRepositoriesModule],
      providers: [PsychologistFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PostgreSqlPrismaOrmService);
    psychologistFactory = moduleRef.get(PsychologistFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();

    // hashing a static known password to use in tests
    const bcrypt = new BcryptHasherService();
    password = faker.internet.password({ length: 8 });
    const hashedPassword = await bcrypt.hash(password);

    // creating a psychologist account to use in tests
    psychologist = await psychologistFactory.makePrismaPsychologist({
      password: hashedPassword,
    });

    psychologistId = psychologist.id;
    access_token = jwt.sign({
      id: psychologistId,
      name: psychologist.name,
      email: psychologist.email,
    });

    invalid_access_token = jwt.sign({ psychologistId });
    clinic = makeClinic(psychologistId);
  });

  it('[POST] - Should successfully create a new clinic', async () => {
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(clinic);

    expect(createdClinicResponse.statusCode).toBe(201);
    expect(createdClinicResponse.body.message).toBe('Clinic created successfully');
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
    const newClinic = makeClinic(psychologistId);

    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`);

    expect(createdClinicResponse.statusCode).toBe(400);

    expect(createdClinicResponse.body.message).toBe('Validation failed');
    expect(createdClinicResponse.text).toBe(
      '{"message":"Validation failed","causes":[{"property":"name","constraints":{"isString":"name must be a string"}},{"property":"psychologistId","constraints":{"isString":"psychologistId must be a string"}},{"property":"city","constraints":{"isString":"city must be a string"}},{"property":"state","constraints":{"isString":"state must be a string"}}]}'
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
