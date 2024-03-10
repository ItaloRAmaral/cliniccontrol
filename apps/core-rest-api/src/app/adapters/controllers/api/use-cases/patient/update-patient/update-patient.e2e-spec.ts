import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { PatientEntity } from '../../../../../../core/domains/patient/entities/patient/entity';

describe('[E2E] - Update Psychologist Account', () => {
  let app: INestApplication;

  let patient: PatientEntity;
  let access_token: string;
  let invalid_access_token: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    app = setup.app;

    patient = setup.patient;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
  });

  it('[PATCH] - Should successfully update a patient account', async () => {
    const updateInfos = {
      name: 'New Name',
      email: 'new_email@email.com',
    };

    const response = await request(app.getHttpServer())
      .patch(`/patient/${patient.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Patient updated successfully');
  });

  it('[PATCH] - Should return an error when trying to update a patient without access_token', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/patient/${patient.id}/update`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a patient with invalid access_token', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/patient/${patient.id}/update`)
      .set('Authorization', `Bearer ${invalid_access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a patient with invalid id', async () => {
    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/patient/invalid_id/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['id must be a UUID']);
  });

  it('[PATCH] - Should return an error when trying to update a patient with non existent id', async () => {
    const nonExistentId = faker.string.uuid();

    const updateInfos = {
      name: 'New Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/patient/${nonExistentId}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('patient not found');
  });

  it('[PATCH] - Should return an error when trying to update a patient with empty request body', async () => {
    const updateInfos = {};

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${patient.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Must provide at least one field to update');
  });

  it('[PATCH] - Should return an error when trying to update a patient with an invalid body type params', async () => {
    const updateInfos = {
      name: 123,
      email: 123,
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${patient.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual([
      'name must be a string',
      'email must be a string',
    ]);
  });
});
