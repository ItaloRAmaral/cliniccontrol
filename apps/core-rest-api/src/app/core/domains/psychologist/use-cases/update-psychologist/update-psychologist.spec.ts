import { fakerPT_BR as faker } from '@faker-js/faker';
import { BadRequestException, ConflictException } from '@nestjs/common';

import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { BcryptHasherService } from '../../../../shared/cryptography/use-cases/bcrypt-hasher.service';
import { Plan, Role } from '../../../../shared/interfaces/payments';
import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
import { ClinicDatabaseRepository } from '../../../clinic/repositories/database-repository';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePsychologistService } from './update-psychologist.service';

describe('[psychologist] Update Psychologist Service', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: Role.PSYCHOLOGIST,
    plan: Plan.BASIC,
  };

  let hasherService: BcryptHasherService;

  let service: UpdatePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;
  let clinicDatabaseRepository: ClinicDatabaseRepository;

  let psychologist: PsychologistEntity;
  let password: string;

  beforeAll(async () => {
    clinicDatabaseRepository = new InMemoryClinicDatabaseRepository();
    databaseRepository = new InMemoryPsychologistDatabaseRepository(
      clinicDatabaseRepository
    );
    service = new UpdatePsychologistService(databaseRepository);
    hasherService = new BcryptHasherService();

    password = faker.internet.password({ length: 8 });
    const hashedPassword = await hasherService.hash(password);

    psychologist = await databaseRepository.createPsychologist({
      ...fakePsychologist,
      password: hashedPassword,
    });
  });

  it('should update a new psychologist', async () => {
    password = faker.internet.password({ length: 8 });

    const newPsychologistInfos = {
      id: psychologist.id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
      plan: Plan.PREMIUM,
    };

    await service.execute(newPsychologistInfos);

    const findPsychologist = await databaseRepository.findPsychologistById(
      psychologist.id
    );

    expect(findPsychologist).toEqual({
      ...psychologist,
      ...newPsychologistInfos,
    });

    expect(findPsychologist?.password).not.toBe(password);
    expect(findPsychologist?.password).toBe(newPsychologistInfos.password);

    expect(findPsychologist?.name).not.toBe(fakePsychologist.name);
    expect(findPsychologist?.name).toBe(newPsychologistInfos.name);

    expect(findPsychologist?.email).not.toBe(fakePsychologist.email);
    expect(findPsychologist?.email).toBe(newPsychologistInfos.email);

    expect(findPsychologist?.plan).not.toBe(fakePsychologist.plan);
    expect(findPsychologist?.plan).toBe(newPsychologistInfos.plan);
  });

  it('should not update a new psychologist and throw an BadRequestException if not exists', async () => {
    const newPsychologistInfos = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new BadRequestException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'])
    );
  });

  it('should not update a new psychologist and throw an BadRequestException if email is equal to actual email', async () => {
    const newPsychologistInfos = {
      id: psychologist.id,
      name: faker.person.fullName(),
      email: psychologist.email,
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['SAME_EMAIL'])
    );
  });

  it('should not update a new psychologist and throw an BadRequestException if password is the same', async () => {
    const newPsychologistInfos = {
      id: psychologist.id,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
      plan: Plan.PREMIUM,
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['SAME_PASSWORD'])
    );
  });

  it('should not update a new psychologist and throw an BadRequestException if email already exists', async () => {
    const newPsychologist = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      role: Role.PSYCHOLOGIST,
      plan: Plan.BASIC,
    };

    await databaseRepository.createPsychologist(newPsychologist);

    const newPsychologistInfos = {
      id: psychologist.id,
      name: faker.person.fullName(),
      email: newPsychologist.email,
    };

    await expect(service.execute(newPsychologistInfos)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL'])
    );
  });
});
