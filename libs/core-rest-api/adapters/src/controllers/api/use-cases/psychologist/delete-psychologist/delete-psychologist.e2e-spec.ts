import { faker } from '@faker-js/faker';
import request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';

import { ClinicFactory } from '../../../../../../tests/factories/make-clinic';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../../../../database/repositories/repositories.module';
import { ApiModule } from '../../../api.module';

describe('[E2E] - Delete Psychologist Account', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;

  let psychologistFactory: PsychologistFactory;
  let clinicFactory: ClinicFactory;
  let jwt: JwtService;

  let id: string;
  let access_token: string;
  let invalid_access_token: string;
  let psychologist: PsychologistEntity;
  let hashedPassword: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule, DatabaseRepositoriesModule],
      providers: [PsychologistFactory, ClinicFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PostgreSqlPrismaOrmService);

    clinicFactory = moduleRef.get(ClinicFactory);
    psychologistFactory = moduleRef.get(PsychologistFactory);
    jwt = moduleRef.get(JwtService);

    // Necessary to validate dto route params in controller
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    // hashing a static known password to use in tests
    const bcrypt = new BcryptHasherService();
    const password = faker.internet.password({ length: 8 });
    hashedPassword = await bcrypt.hash(password);

    // creating a psychologist account to use in tests
    psychologist = await psychologistFactory.makePrismaPsychologist({
      password: hashedPassword,
    });

    id = psychologist.id;
    access_token = jwt.sign({
      id,
      name: psychologist.name,
      email: psychologist.email,
    });

    invalid_access_token = jwt.sign({ id });
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
    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${psychologist.email}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Psychologist deleted successfully');
    expect(Array.isArray(response.body.data.associatedClinics)).toBe(true);
    expect(response.body.data.associatedClinics).toHaveLength(0);

    const deletedPsychologist = await prisma['psychologist'].findUnique({
      where: { id },
    });

    expect(deletedPsychologist).toBeNull();
  });

  it('[DELETE] - Should successfully delete a psychologist account with associated clinics', async () => {
    const newPsychologist = await psychologistFactory.makePrismaPsychologist({
      password: hashedPassword,
    });

    const new_access_token = jwt.sign({
      id,
      name: psychologist.name,
      email: psychologist.email,
    });

    await clinicFactory.makePrismaClinic({ psychologistId: newPsychologist.id });

    const response = await request(app.getHttpServer())
      .delete(`/psychologist/${psychologist.email}/delete`)
      .set('Authorization', `Bearer ${new_access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Psychologist deleted successfully');
    expect(Array.isArray(response.body.data.associatedClinics)).toBe(true);
    expect(response.body.data.associatedClinics).not.toHaveLength(0);

    const deletedPsychologist = await prisma['psychologist'].findUnique({
      where: { id: newPsychologist.id },
      include: { clinic: true },
    });

    const deletedClinic = await prisma['clinic'].findFirst({
      where: { psychologistId: newPsychologist.id },
    });

    expect(deletedPsychologist).toBeNull();
    expect(deletedClinic).toBeNull();
  });
});
