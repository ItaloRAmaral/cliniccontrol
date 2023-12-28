import { fakerPT_BR as faker } from '@faker-js/faker';

import { ConflictException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { Plan, Role } from '../../../../shared/interfaces/payments';
import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
import { ClinicDatabaseRepository } from '../../../clinic/repositories/database-repository';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { CreatePsychologistService } from '../create-psychologist/create-psychologist.service';
import { AuthenticatePsychologistService } from './authenticate-psychologist.service';

describe('teste', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
  };

  let createPsychologistService: CreatePsychologistService;
  let loginService: AuthenticatePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;
  let clinicDatabaseRepository: ClinicDatabaseRepository;

  beforeEach(async () => {
    clinicDatabaseRepository = new InMemoryClinicDatabaseRepository();
    databaseRepository = new InMemoryPsychologistDatabaseRepository(
      clinicDatabaseRepository
    );
    createPsychologistService = new CreatePsychologistService(databaseRepository);
    loginService = new AuthenticatePsychologistService(databaseRepository);

    await createPsychologistService.execute(fakePsychologist);
  });

  it('should throw an error if psychologist not exist in database', async () => {
    const loginCredentials = {
      email: 'fake@email.com',
      password: fakePsychologist.password,
    };

    await expect(loginService.execute(loginCredentials)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'])
    );
  });

  it('should throw an error if password is invalid', async () => {
    const loginCredentials = {
      email: fakePsychologist.email,
      password: faker.internet.password({ length: 5 }),
    };

    await expect(loginService.execute(loginCredentials)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['INVALID_CREDENTIALS'])
    );
  });

  it('should return a psychologist if credentials are valid', async () => {
    const loginCredentials = {
      email: fakePsychologist.email,
      password: fakePsychologist.password,
    };

    const psychologist = await loginService.execute(loginCredentials);

    expect(psychologist).toBeDefined();
    expect(psychologist.id).toBeDefined();
    expect(psychologist.name).toBe(fakePsychologist.name);
    expect(psychologist.email).toBe(fakePsychologist.email);
    expect(psychologist.role).toBe(fakePsychologist.role);
    expect(psychologist.plan).toBe(fakePsychologist.plan);
  });
});
