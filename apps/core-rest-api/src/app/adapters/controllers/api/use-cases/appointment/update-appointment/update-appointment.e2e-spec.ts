import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { faker } from '@faker-js/faker';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { AppointmentEntity } from '../../../../../../core/domains/appointment/entities/appointment/entity';

describe('[E2E] - Update Appointment', () => {
  let app: INestApplication;
  let appointment: AppointmentEntity;
  let access_token: string;
  let invalid_access_token: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    app = setup.app;
    appointment = setup.appointment
    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
  });

  it('[PATCH] - Should successfully update an appointment', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
      cancelled: true,
    };

    const response = await request(app.getHttpServer())
      .patch(`/appointment/${appointment.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Appointment updated successfully');
  });

  it('[PATCH] - Should return an error when trying to update an appointment without access_token', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
      cancelled: true,
    };

    const response = await request(app.getHttpServer())
      .patch(`/appointment/${appointment.id}/update`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with invalid access_token', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
    };

    const response = await request(app.getHttpServer())
      .patch(`/appointment/${appointment.id}/update`)
      .set('Authorization', `Bearer ${invalid_access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with invalid id', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
    };

    const response = await request(app.getHttpServer())
      .patch(`/appointment/invalid_id/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual(['id must be a UUID']);
  });

  it('[PATCH] - Should return an error when trying to update an appointment with non existent id', async () => {
    const nonExistentId = faker.string.uuid();

    const updatedAppointmentInfos = {
      confirmed: false,
    };

    const response = await request(app.getHttpServer())
      .patch(`/appointment/${nonExistentId}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('appointment not found');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with empty request body', async () => {
    const updatedAppointmentInfos = {};

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${appointment.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Must provide at least one field to update');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with an invalid body type params', async () => {
    const updatedAppointmentInfos = {
      confirmed: 'false',
      cancelled: 'true'
    };

    const response = await request(app.getHttpServer())
      .patch(`/psychologist/${appointment.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(updatedAppointmentInfos);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual([
      'confirmed must be a boolean',
      'cancelled must be a boolean',
    ]);
  });
});
