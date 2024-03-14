import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { Replace } from '../../../../../../../app/shared/utils';
import { AppointmentEntity } from '../../../../../../core/domains/appointment/entities/appointment/entity';
import { UpdateAppointmentControllerBodyInputDto } from './input.dto';

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

  type IUpdateAppointmentProps = Replace<
    UpdateAppointmentControllerBodyInputDto,
    { confirmed?: string | boolean; cancelled?: string | boolean }
  >;

  async function updateAppointmentWithoutAcessToken (appointmentId: string, updatedAppointmentInfos: IUpdateAppointmentProps) {
    const response = await request(app.getHttpServer())
      .patch(`/appointment/${appointmentId}/update`)
      .send(updatedAppointmentInfos)

    return response
  }

  async function updateAppointmentWithAcessToken (appointmentId: string, updatedAppointmentInfos: IUpdateAppointmentProps, accessToken?: string) {
    const response = await request(app.getHttpServer())
      .patch(`/appointment/${appointmentId}/update`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedAppointmentInfos);

    return response
  }

  it('[PATCH] - Should successfully update an appointment', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
      cancelled: true,
    };

    const response = await updateAppointmentWithAcessToken(appointment.id, updatedAppointmentInfos, access_token)

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Appointment updated successfully');
  });

  it('[PATCH] - Should return an error when trying to update an appointment without access_token', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
      cancelled: true,
    };

    const response = await updateAppointmentWithoutAcessToken(appointment.id, updatedAppointmentInfos)

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with invalid access_token', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
    };

    const response = await updateAppointmentWithAcessToken(appointment.id, updatedAppointmentInfos, invalid_access_token)

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with invalid id', async () => {
    const updatedAppointmentInfos = {
      confirmed: false,
    };
    const response = await updateAppointmentWithAcessToken('invalid_id', updatedAppointmentInfos, access_token)

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('appointment not found');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with non existent id', async () => {
    const nonExistentId = faker.string.uuid();

    const updatedAppointmentInfos = {
      confirmed: false,
    };

    const response = await updateAppointmentWithAcessToken(nonExistentId, updatedAppointmentInfos, access_token)

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('appointment not found');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with empty request body', async () => {
    const updatedAppointmentInfos = {};

    const response = await updateAppointmentWithAcessToken(appointment.id, updatedAppointmentInfos, access_token)

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Must provide at least one field to update');
  });

  it('[PATCH] - Should return an error when trying to update an appointment with an invalid body type params', async () => {
    const updatedAppointmentInfos = {
      confirmed: 'false',
      cancelled: 'true'
    };

    const response = await updateAppointmentWithAcessToken(appointment.id, updatedAppointmentInfos, access_token)

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual([
      'confirmed must be a boolean value',
      'cancelled must be a boolean value',
    ]);
  });
});
