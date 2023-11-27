import { faker } from '@faker-js/faker';
import request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';

import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { setupE2ETest } from '../../../shared/utils/e2e-tests-initial-setup';

describe('[E2E] - Delete Psychologist Account', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;

  let psychologistFactory: PsychologistFactory;
  let jwt: JwtService;

  let access_token: string;
  let invalid_access_token: string;
  let psychologist: PsychologistEntity;
  let hashedPassword: string;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    prisma = setup.prisma;
    app = setup.app;
    psychologistFactory = setup.psychologistFactory;

    jwt = setup.jwt;
    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;

    psychologist = setup.psychologist;
    hashedPassword = setup.hashedPassword;
  });

  it('[DELETE] - Should return an error when trying to delete a psychologist without access_token', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/psychologist/${psychologist.email}/delete`
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete a psychologist with invalid access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${psychologist.email}/delete`)
      .set('Authorization', `Bearer ${invalid_access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - should throw an error if param email is not the same as user email', async () => {
    const wrongEmail = faker.internet.email();

    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${wrongEmail}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You can only delete your own account');
  });

  it('[DELETE] - Should throw an error if route param is not an valid email', async () => {
    const response = await request(app.getHttpServer())
      .delete('/psychologist/invalid_email/delete')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(400);
    expect(response.body.message[0]).toBe('psychologistEmail must be an email');
  });

  it('[DELETE] - Should successfully delete a psychologist account with no associated clinics', async () => {
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      password: hashedPassword,
      email: faker.internet.email(),
    });

    const new_access_token = jwt.sign({
      id: newPsychologist.id,
      name: newPsychologist.name,
      email: newPsychologist.email,
    });

    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${newPsychologist.email}/delete`)
      .set('Authorization', `Bearer ${new_access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Psychologist deleted successfully');
    expect(Array.isArray(response.body.data.associatedClinics)).toBe(true);
    expect(response.body.data.associatedClinics).toHaveLength(0);

    const deletedPsychologist = await prisma['psychologist'].findUnique({
      where: { id: newPsychologist.id },
    });

    expect(deletedPsychologist).toBeNull();
  });

  it('[DELETE] - Should successfully delete a psychologist account with associated clinics', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${psychologist.email}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Psychologist deleted successfully');
    expect(Array.isArray(response.body.data.associatedClinics)).toBe(true);
    expect(response.body.data.associatedClinics).not.toHaveLength(0);

    const deletedPsychologist = await prisma['psychologist'].findUnique({
      where: { id: psychologist.id },
      include: { clinic: true },
    });

    const deletedClinic = await prisma['clinic'].findFirst({
      where: { psychologistId: psychologist.id },
    });

    expect(deletedPsychologist).toBeNull();
    expect(deletedClinic).toBeNull();
  });
});
