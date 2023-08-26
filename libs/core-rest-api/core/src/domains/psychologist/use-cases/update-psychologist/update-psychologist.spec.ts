import { faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { CreatePsychologistDto } from '../create-psychologist/create-psychologist-dto';
import { UpdatePsychologistService } from './update-psychologist.service';

describe('[psychologist] Update Psychologist Service', () => {
  const fakePsychologist: CreatePsychologistDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: faker.person.jobTitle(),
    plan: 'basic',
  };

  let service: UpdatePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePsychologistService,
        {
          provide: PsychologistDatabaseRepository,
          useClass: InMemoryPsychologistDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<UpdatePsychologistService>(UpdatePsychologistService);
    databaseRepository = module.get<PsychologistDatabaseRepository>(
      PsychologistDatabaseRepository
    );
  });

  it('should update a new psychologist', async () => {
    const createPsychologist = await databaseRepository.createPsychologist(
      fakePsychologist
    );

    const newPsychologistInfos = {
      id: createPsychologist.id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'new_password',
      plan: 'premium',
    };

    await service.execute(newPsychologistInfos);

    const findPsychologist = await databaseRepository.findPsychologistById(
      createPsychologist.id
    );

    expect(findPsychologist).toEqual({
      ...createPsychologist,
      ...newPsychologistInfos,
    });

    expect(findPsychologist?.password).not.toBe(fakePsychologist.password);
    expect(findPsychologist?.password).toBe(newPsychologistInfos.password);

    expect(findPsychologist?.name).not.toBe(fakePsychologist.name);
    expect(findPsychologist?.name).toBe(newPsychologistInfos.name);

    expect(findPsychologist?.email).not.toBe(fakePsychologist.email);
    expect(findPsychologist?.email).toBe(newPsychologistInfos.email);

    expect(findPsychologist?.plan).not.toBe(fakePsychologist.plan);
    expect(findPsychologist?.plan).toBe(newPsychologistInfos.plan);
  });

  it('should not update a new psychologist if not exists', async () => {
    const newPsychologistInfos = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'new_password',
      plan: 'premium',
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      )
    );
  });
});
