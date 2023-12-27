import { fakerPT_BR as faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { PatientEntity } from '@clinicControl/core-rest-api/core/src/domains/patient/entities/patient/entity';
import { PatientFactory } from '../../../../../../tests/factories/make-patient';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';

describe('[E2E] - Delete Patient', async () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;

  let patientFactory: PatientFactory;
  let psychologistFactory: PsychologistFactory;

  let access_token: string;
  let invalid_access_token: string;

  let patient: PatientEntity;
  let clinic: ClinicEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();

    prisma = setup.prisma;
    app = setup.app;

    patientFactory = setup.patientFactory;
    psychologistFactory = setup.psychologistFactory;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;

    clinic = setup.clinic;
    patient = setup.patient;
  });

  it('[DELETE] - Should return an error when trying to delete a patient without access_token', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/patient/${patient.id}/delete`,
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete a patient with invalid access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/patient/${patient.id}/delete`)
      .set('Authorization', `Bearer ${invalid_access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should throw an error when trying to delete a patient which does not belong to the psychologist', async () => {
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      email: faker.internet.email(),
    });

    const newPatient = await patientFactory.makePrismaPatient({
      psychologistId: newPsychologist.id,
      clinicId: clinic.id,
    });

    const response = await request(app.getHttpServer())
      .delete(`/patient/${newPatient.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('this patient does not belong to you');
  });

  it('[DELETE] - Should throw an error when trying to delete a patient that does not exist', async () => {
    const fakePatientId = faker.string.uuid();

    const response = await request(app.getHttpServer())
      .delete(`/patient/${fakePatientId}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('patient not found');
  });

  it('[DELETE] - Should successfully delete a patient', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/patient/${patient.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    const isPatientExist = await prisma.patient.findUnique({
      where: {
        id: patient.id,
      },
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Patient deleted successfully');

    expect(isPatientExist).toBe(null);
  });
});
