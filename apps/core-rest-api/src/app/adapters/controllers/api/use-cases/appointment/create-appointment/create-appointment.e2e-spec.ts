import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import request from 'supertest';
import { makeAppointment } from '../../../../../../../../tests/factories/make-appointment';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { CreateSingleAppointmentDto } from '../../../../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { PaymentMethod } from '../../../../../../core/shared/interfaces/payments';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe('[E2E] - Create New Appointment', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  let access_token: string;

  let psychologistId: string;
  let clinicId: string;
  let patientId: string;

  // let patient: PatientEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;
    prisma = setup.prisma;

    access_token = setup.access_token;

    clinicId = setup.clinic.id;
    psychologistId = setup.psychologist.id;

    patientId = setup.patient.id;
  });

  it('[POST] - Should successfully create a new appointment', async () => {
    const newAppointment: CreateSingleAppointmentDto = makeAppointment({
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

    const response = await request(app.getHttpServer())
      .post('/appointment/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(newAppointment);

    const appointmentOnDatabase = await prisma.appointment.findFirst({
      where: {
        patientId: newAppointment.patientId,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Appointment created successfully');
    expect(appointmentOnDatabase).toBeTruthy();
  });
})
