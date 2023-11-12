import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { DatabaseRepositoriesModule } from '@clinicControl/core-rest-api/adapters/src/database/repositories/repositories.module';
import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';
import { PsychologistFactory } from '@clinicControl/root/libs/core-rest-api/adapters/tests/factories/make-psychologist';
import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { ApiModule } from '../../../api.module';

describe('[E2E] - Update Psychologist Account', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;
  let psychologistFactory: PsychologistFactory;
  let jwt: JwtService;

  let id: string;
  let access_token: string;
  let invalid_access_token: string;
  let psychologist: PsychologistEntity;
  let password: string;

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

    id = psychologist.id;
    access_token = jwt.sign({
      id,
      name: psychologist.name,
      email: psychologist.email,
    });

    invalid_access_token = jwt.sign({ id });
  });

  it('[PATCH] - Should successfully update a psychologist account', async () => {
    const updateInfos = {
      name: 'New Name',
      email: 'new_email@email.com',
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Psychologist updated successfully');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist without access_token', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with invalid access_token', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${invalid_access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with invalid id', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/invalid_id/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('psychologist not found');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with empty request body', async () => {
    const updateInfos = {};

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Must provide at least one field to update');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with an existing email', async () => {
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      email: 'existing_email@email.com',
    });

    const updateInfos = {
      email: newPsychologist.email,
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('email already exists');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with the same account email', async () => {
    const updateInfos = {
      email: 'new_email@email.com', // this email is from first test where we updated our psychologist account
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('new email must be different from the old one');
  });

  it('[PATCH] - Should return an error when trying to update a psychologist with the same account password', async () => {
    const updateInfos = {
      password,
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('new password must be different from the old one');
  });
});
