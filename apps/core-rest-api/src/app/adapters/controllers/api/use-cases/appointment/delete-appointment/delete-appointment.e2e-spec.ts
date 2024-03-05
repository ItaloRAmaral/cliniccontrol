import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { AppointmentEntity } from '../../../../../../core/domains/appointment/entities/appointment/entity';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe('[E2E] - Delete Appointment', () => {
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
  });

  it('[DELETE] - Should return an error when trying to delete an appointment without access_token', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/appointment/${appointment.id}/delete`,
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete an apppointment with invalid access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/appointment/${appointment.id}/delete`)
      .set('Authorization', `Bearer ${invalid_access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should throw an error if route param is not an valid id', async () => {
    const wrongId = faker.string.uuid();

    const response = await request(app.getHttpServer())
      .delete(`/appointment/${wrongId}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('appointment not found');
  });

  it('[DELETE] - Should successfully delete an appointment', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/appointment/${appointment.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Appointment deleted successfully');

    const deletedAppointment = await prisma.appointment.findUnique({
      where: { id: appointment.id },
    });

    expect(deletedAppointment).toBeNull();
  });
});
