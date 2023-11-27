import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Update Psychologist Account', () => {
  let app: INestApplication;
  let psychologistFactory: PsychologistFactory;

  let id: string;
  let access_token: string;
  let invalid_access_token: string;
  let password: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    app = setup.app;

    psychologistFactory = setup.psychologistFactory;

    id = setup.id;
    password = setup.password;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
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

  it('[PATCH] - Should return an error when trying to update a psychologist with an invalid body type params', async () => {
    const updateInfos = {
      name: 123,
      email: 123,
      price: '123',
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updateInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual([
      'name must be a string',
      'email must be a string',
      'price must be a number conforming to the specified constraints',
    ]);
  });
});
