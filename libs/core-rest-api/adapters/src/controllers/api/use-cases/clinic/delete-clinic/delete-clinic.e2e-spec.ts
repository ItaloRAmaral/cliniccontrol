/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import request from 'supertest';
import { ClinicFactory } from '../../../../../../tests/factories/make-clinic';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Delete Clinic', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;
  let psychologistFactory: PsychologistFactory;
  let clinicFactory: ClinicFactory;
  let jwt: JwtService;
  let id: string;
  let access_token: string;
  let invalid_access_token: string;
  let psychologist: PsychologistEntity;
  let clinic: ClinicEntity;
  let hashedPassword: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    prisma = setup.prisma;
    app = setup.app;
    psychologistFactory = setup.psychologistFactory;
    clinicFactory = setup.clinicFactory;
    jwt = setup.jwt;
    id = setup.id;
    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
    psychologist = setup.psychologist;
    clinic = setup.clinic;
    hashedPassword = setup.hashedPassword;
  });

  it('[DELETE] - Should return an error when trying to delete a clinic without access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clinic/${clinic.id}/delete`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete a clinic with invalid access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clinic/${clinic.id}/delete`)
      .set('Authorization', `Bearer ${invalid_access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should throw an error if route param is not an valid id', async () => {
    const wrongId = faker.string.uuid();

    const response = await request(app.getHttpServer())
      .delete(`/clinic/${wrongId}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('clinic not found');
  });

  it('[DELETE] - Should successfully delete a clinic', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clinic/${clinic.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Clinic deleted successfully');
    expect(response.body.data).toEqual(expect.objectContaining({
      clinic: expect.objectContaining({name: expect.any(String)}),
      deletedAt: expect.any(String)
    }));

    const deletedClinic = await prisma['clinic'].findUnique({
      where: { id: clinic.id },
    });

    expect(deletedClinic).toBeNull();
  });
});
