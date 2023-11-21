import { faker } from '@faker-js/faker';
import request from 'supertest';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';

import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { ClinicFactory } from '../../../../../../tests/factories/make-clinic';
import { PsychologistFactory } from '../../../../../../tests/factories/make-psychologist';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../../../../database/repositories/repositories.module';
import { ApiModule } from '../../../api.module';

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
  let clinic: ClinicEntity
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

    clinic = await clinicFactory.makePrismaClinic({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      psychologistId: psychologist.id,
      state: faker.location.city()
    });

    id = psychologist.id;
    access_token = jwt.sign({
      id,
      name: psychologist.name,
      email: psychologist.email,
    });

    invalid_access_token = jwt.sign({ id });
  });

  it('[DELETE] - Should return an error when trying to delete a clinic without access_token', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/clinic/${clinic.id}/delete`
    );

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

  it.only('[DELETE] - Should successfully delete a clinic', async () => {
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
      where: { id },
    });

    expect(deletedClinic).toBeNull();
  });
});
