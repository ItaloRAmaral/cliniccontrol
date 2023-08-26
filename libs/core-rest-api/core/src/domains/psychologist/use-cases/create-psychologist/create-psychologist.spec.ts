import { faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { CreatePsychologistService } from './create-psychologist.service';

describe('[psychologist] Create Psychologist Service', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: faker.person.jobTitle(),
    plan: 'premium',
  };

  let service: CreatePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePsychologistService,
        {
          provide: PsychologistDatabaseRepository,
          useClass: InMemoryPsychologistDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<CreatePsychologistService>(CreatePsychologistService);
    databaseRepository = module.get<PsychologistDatabaseRepository>(
      PsychologistDatabaseRepository
    );
  });

  it('should create a new psychologist', async () => {
    const psychologist = await service.execute(fakePsychologist);

    const psychologistDatabaseRepository =
      await databaseRepository.findPsychologistByEmail(psychologist.email);

    expect(psychologistDatabaseRepository?.email).toEqual(psychologist.email);
    expect(psychologist.email).toEqual(fakePsychologist.email);
    expect(psychologist.name).toEqual(fakePsychologist.name);
  });

  it('should throw conflict exception if email already exists', async () => {
    await service.execute(fakePsychologist);

    await expect(service.execute(fakePsychologist)).rejects.toThrow(
      new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS']
      )
    );
  });
});
