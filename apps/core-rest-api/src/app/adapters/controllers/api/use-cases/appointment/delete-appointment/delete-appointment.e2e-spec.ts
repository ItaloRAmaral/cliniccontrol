import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { AppointmentEntity } from '../../../../../../core/domains/appointment/entities/appointment/entity';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe.only('[E2E] - Delete Appointment', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;
  let access_token: string;
  let invalid_access_token: string;
  let appointment: AppointmentEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    prisma = setup.prisma;
    app = setup.app;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
    appointment = setup.appointment
    console.log('APPPOINTOMENT', appointment)
  });

  async function deleteAppointmentWithoutAcessToken (appointmentId: string) {
    const response = await request(app.getHttpServer())
      .delete(`/appointment/${appointmentId}/delete`)

    return response
  }

  async function deleteAppointmentWithAcessToken (appointmentId: string, accessToken?: string) {
    const response = await request(app.getHttpServer())
      .delete(`/appointment/${appointmentId}/delete`)
      .set('Authorization', `Bearer ${accessToken}`);

    return response
  }

  it('[DELETE] - Should return an error when trying to delete an appointment without access_token', async () => {
    const response = await deleteAppointmentWithoutAcessToken(appointment.id)

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete an apppointment with invalid access_token', async () => {
    const accessToken = invalid_access_token
    const response = await deleteAppointmentWithAcessToken(appointment.id, accessToken)

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should throw an error if route param is not an valid id', async () => {
    const wrongId = faker.string.uuid();
    const response = await deleteAppointmentWithAcessToken(wrongId, access_token)

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('appointment not found');
  });

  it('[DELETE] - Should successfully delete an appointment', async () => {
    const response = await deleteAppointmentWithAcessToken(appointment.id, access_token)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Appointment deleted successfully');

    const deletedAppointment = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });

    expect(deletedAppointment).toBeNull();
  });
});
