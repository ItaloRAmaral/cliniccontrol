import { fakerPT_BR as faker } from '@faker-js/faker';

import { PSYCHOLOGIST_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { ConflictException } from '@nestjs/common';
import { Plan, Role } from '../../../../shared/interfaces/payments';
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

  beforeEach(async () => {
    databaseRepository = new InMemoryPsychologistDatabaseRepository();
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
      password: 'invalidPassword',
    };

    await expect(loginService.execute(loginCredentials)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['INVALID_CREDENTIALS'])
    );
  });
});
