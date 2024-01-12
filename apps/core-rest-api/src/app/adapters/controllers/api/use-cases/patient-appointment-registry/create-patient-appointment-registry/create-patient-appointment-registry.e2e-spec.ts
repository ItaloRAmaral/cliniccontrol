import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from '@nestjs/testing';
import { PsychologistFactory } from '../../../../../../../../tests/factories/make-psychologist';
import { PsychologistEntity } from '../../../../../../core/domains/psychologist/entities/psychologist/entity';
import { BcryptHasherService } from '../../../../../../core/shared/cryptography/use-cases/bcrypt-hasher.service';
import { DatabaseRepositoriesModule } from '../../../../../database/repositories/repositories.module';
import { ApiModule } from "../../../api.module";
import request from 'supertest';
import { PatientAppointmentRegistryEntity } from "@clinicControl/core-rest-api/core/domains/patient-appointment-registry/entities/registry/entity";

describe('[E2E] - Create Appointment Registry', () => {
  let app: INestApplication;
  let psychologistFactory: PsychologistFactory;
  let jwt: JwtService;
  let psychologistId: string;
  let access_token: string;
  let psychologist: PsychologistEntity;
  let password: string;
  let appointmentRegistry: PatientAppointmentRegistryEntity

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule, DatabaseRepositoriesModule],
      providers: [PsychologistFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    psychologistFactory = moduleRef.get(PsychologistFactory);
    jwt = moduleRef.get(JwtService);

    await app.init();

    // hashing a static known password to use in tests
    const bcrypt = new BcryptHasherService();
    password = faker.internet.password({ length: 8 });
    const hashedPassword = await bcrypt.hash(password);

    // creating a psychologist account to use in tests
    psychologist = await psychologistFactory.makePrismaPsychologist({
      password: hashedPassword,
    });

    psychologistId = psychologist.id;
    access_token = jwt.sign({
      id: psychologistId,
      name: psychologist.name,
      email: psychologist.email,
    });

    appointmentRegistry = new make
  });

  it('[POST] - Should successfully create a new registry', async () => {
    const createdClinicResponse = await request(app.getHttpServer())
      .post('/clinic/create')
      .set('Authorization', `Bearer ${access_token}`)
      .send(clinic);

    expect(createdClinicResponse.statusCode).toBe(201);
    expect(createdClinicResponse.body.message).toBe('Clinic created successfully');
  });
})
