import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { ClinicEntity } from '../../../../../../core/domains/clinic/entities/clinic/entity';

describe('[E2E] - Update Clinic', () => {
  let app: INestApplication;
  let clinic: ClinicEntity
  let access_token: string;
  let invalid_access_token: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    app = setup.app;

    clinic = setup.clinic

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
  });

  it('[PATCH] - Should successfully update a clinic', async () => {
    const updateInfos = {
      name: 'New Clinic Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/clinic/${clinic.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Clinic updated successfully');
  });

  it('[PATCH] - Should return an error when trying to update a clinic without access_token', async () => {
    const updateInfos = {
      name: 'New Clinic Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/clinic/${clinic.id}/update`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a clinic with invalid access_token', async () => {
    const updateInfos = {
      name: 'New Clinic Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/clinic/${clinic.id}/update`)
      .set('Authorization', `Bearer ${invalid_access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update a clinic with invalid id', async () => {
    const updateInfos = {
      name: 'New Clinic Name',
    };

    const response = await request(app.getHttpServer())
      .patch(`/clinic/invalid_id/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe('clinic not found');
  });

  it('[PATCH] - Should return an error when trying to update a clinic with empty request body', async () => {
    const updateInfos = {};

    const response = await request(app.getHttpServer())
      .patch(`/clinic/${clinic.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Must provide at least one field to update');
  });

  it('[PATCH] - Should return an error when trying to update a clinic with an invalid body type params', async () => {
    const updateInfos = {
      name: 123,
    };

    const response = await request(app.getHttpServer())
      .patch(`/clinic/${clinic.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toStrictEqual(['name must be a string']);
  });
});
