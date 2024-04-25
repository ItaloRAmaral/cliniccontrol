import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { setupE2ETest } from '../../../../../../../tests/utils/e2e-tests-initial-setup';
import { PatientAppointmentRegistryEntity } from '../../../../../core/domains/patient-appointment-registry/entities/registry/entity';
import { PostgreSqlPrismaOrmService } from '../../../../database/infra/prisma/prisma.service';

describe('[E2E] -  Delete Appointment Registry', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  let access_token: string;

  let patientAppointmentRegistry: PatientAppointmentRegistryEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;
    prisma = setup.prisma;
    access_token = setup.access_token;

    patientAppointmentRegistry = setup.patientAppointmentRegistry;
  });

  it('should delete a patient appointment registry', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/appointment-registry/${patientAppointmentRegistry.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Appointment registry deleted successfully',
    });

    const deletedPatientAppointmentRegistry = await prisma.patientAppointmentRegistry.findUnique({
      where: { id:  patientAppointmentRegistry.id},
    });
    expect(deletedPatientAppointmentRegistry).toBeNull();

  });

  it('should return 404 if the appointment registry does not exist', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/appointment-registry/${patientAppointmentRegistry.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('registry not found');
  });

  it('should return 401 if the user is not authenticated', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/appointment-registry/${patientAppointmentRegistry.id}/delete`,
    );

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid JWT token');
  });
});
