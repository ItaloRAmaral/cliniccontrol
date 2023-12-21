import { BcryptHasherService } from '@clinicControl/core-rest-api/core/src/shared/cryptography/use-cases/bcrypt-hasher.service';
import { faker } from '@faker-js/faker';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { PostgreSqlPrismaOrmService } from '../../../../database/infra/prisma/prisma.service';
import { DatabaseRepositoriesModule } from '../../../../database/repositories/repositories.module';
import { ApiModule } from '../../api.module';

import { ClinicFactory } from '../../../../../tests/factories/make-clinic';
import { PatientFactory } from '../../../../../tests/factories/make-patient';
import { PsychologistFactory } from '../../../../../tests/factories/make-psychologist';

export async function setupE2ETest() {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [ApiModule, DatabaseRepositoriesModule],
    providers: [PsychologistFactory, ClinicFactory, PatientFactory],
  }).compile();

  const app: INestApplication = moduleRef.createNestApplication();

  const prisma: PostgreSqlPrismaOrmService = moduleRef.get(PostgreSqlPrismaOrmService);

  const clinicFactory: ClinicFactory = moduleRef.get(ClinicFactory);
  const psychologistFactory: PsychologistFactory = moduleRef.get(PsychologistFactory);
  const patientFactory: PatientFactory = moduleRef.get(PatientFactory);

  const jwt: JwtService = moduleRef.get(JwtService);

  // Necessary to validate DTO route params in the controller
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  // Hashing a static known password to use in tests
  const bcrypt = new BcryptHasherService();
  const password = faker.internet.password({ length: 8 });
  const hashedPassword = await bcrypt.hash(password);

  // Creating a psychologist account to use in tests
  const psychologist = await psychologistFactory.makePrismaPsychologist({
    password: hashedPassword,
  });

  // Creating access_tokens to use in tests
  const id: string = psychologist.id;
  const access_token: string = jwt.sign({
    id,
    name: psychologist.name,
    email: psychologist.email,
  });
  const invalid_access_token: string = jwt.sign({ id });

  // Creating a clinic to use in tests
  const clinic = await clinicFactory.makePrismaClinic({
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    psychologistId: psychologist.id,
    state: faker.location.city(),
  });

  // Creating a patient to use in tests
  const patient = await patientFactory.makePrismaPatient({
    psychologistId: psychologist.id,
    clinicId: clinic.id,
  });

  return {
    prisma,
    app,
    psychologistFactory,
    psychologist,
    id,
    hashedPassword,
    password,
    jwt,
    access_token,
    invalid_access_token,
    clinicFactory,
    clinic,
    patientFactory,
    patient,
  };
}
