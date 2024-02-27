import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { makeAppointment } from '../../../../../../../../tests/factories/make-appointment';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { AppointmentEntity } from '../../../../../../core/domains/appointment/entities/appointment/entity';
import { PaymentMethod } from '../../../../../../core/shared/interfaces/payments';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe('[E2E] - Delete Appointment', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;
  let access_token: string;
  let invalid_access_token: string;
  let appointment: AppointmentEntity;
  let psychologistId: string;
  let clinicId: string;
  let patientId: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    prisma = setup.prisma;
    app = setup.app;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
    appointment = setup.appointment

    clinicId = setup.clinic.id;
    psychologistId = setup.psychologist.id;
    patientId = setup.patient.id;
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

    console.log('psychologistId', psychologistId)
    console.log('clinicId', clinicId)
    console.log('patientId', patientId)
    const newAppointment: AppointmentEntity = makeAppointment({
      psychologistId,
      clinicId,
      patientId,
      date: faker.date.recent({ days: 10 }),
      cancelled: false,
      confirmationDate: null,
      confirmed: true,
      online: false,
      paymentMethod: PaymentMethod.CREDIT_CARD
    });

    await request(app.getHttpServer())
      .post('/appointment/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(newAppointment);

    const response = await request(app.getHttpServer())
      .delete(`/appointment/${newAppointment.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Appointment deleted successfully');

    const deletedAppointment = await prisma['appointment'].findUnique({
      where: { id: newAppointment.id },
    });

    expect(deletedAppointment).toBeNull();
  });
});
