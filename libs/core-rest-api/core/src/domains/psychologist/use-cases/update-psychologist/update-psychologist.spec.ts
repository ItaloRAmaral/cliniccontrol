import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { Plan, Role } from '../../../../shared/interfaces/payments';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePsychologistService } from './update-psychologist.service';

describe('[psychologist] Update Psychologist Service', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.BASIC,
  };

  let service: UpdatePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryPsychologistDatabaseRepository();
    service = new UpdatePsychologistService(databaseRepository);
  });

  it('should update a new psychologist', async () => {
    const createPsychologist = await databaseRepository.createPsychologist(
      fakePsychologist
    );

    const newPsychologistInfos = {
      id: createPsychologist.id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 5 }),
      plan: Plan.PREMIUM,
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

  it('should not update a new psychologist and throw an ConflictException if not exists', async () => {
    const newPsychologistInfos = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 5 }),
      plan: Plan.PREMIUM,
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'])
    );
  });
});
