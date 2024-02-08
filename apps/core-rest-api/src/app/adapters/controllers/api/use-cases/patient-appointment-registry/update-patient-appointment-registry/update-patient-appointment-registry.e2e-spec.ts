import request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { PatientAppointmentRegistryEntity } from '../../../../../../core/domains/patient-appointment-registry/entities/registry/entity';

describe.only('[E2E] -  Update Appointment Registry', () => {
  let app: INestApplication;

  let access_token: string;

  let patientAppointmentRegistry: PatientAppointmentRegistryEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    app = setup.app;

    access_token = setup.access_token;

    patientAppointmentRegistry = setup.patientAppointmentRegistry;
  });

  it('should update a patient appointment registry', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/appointment-registry/${patientAppointmentRegistry.id}/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        observations: 'update observation'
      })

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: 'Appointment registry updated successfully',
    });
  });

  it('should return 404 if the appointment registry does not exist', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/appointment-registry/fake-id/update`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        observations: 'update observation'
      })

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('registry not found');
  });

  it('should return 401 if the user is not authenticated', async () => {
    const response = await request(app.getHttpServer()).patch(
      `/appointment-registry/${patientAppointmentRegistry.id}/update`,
    );

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Invalid JWT token');
  });
});
