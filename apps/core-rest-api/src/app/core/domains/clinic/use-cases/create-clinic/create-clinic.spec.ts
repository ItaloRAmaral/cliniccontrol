import { fakerPT_BR as faker } from '@faker-js/faker';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { CreateClinicService } from './create-clinic.service';

import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InMemoryClinicDatabaseRepository } from '../../repositories/database-in-memory-repository';

describe('[clinic] Create Clinic Service', () => {
  const fakeClinic = {
    name: faker.company.name(),
    psychologistId: randomUUID(),
    city: faker.location.city(),
    state: faker.location.state(),
  };

  let service: CreateClinicService;
  let databaseRepository: ClinicDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryClinicDatabaseRepository();
    service = new CreateClinicService(databaseRepository);
  });

  it('should create a new clinic', async () => {
    const createClinic = await service.execute(fakeClinic);

    const clinic = await databaseRepository.findClinicById(createClinic.id);

    expect(clinic?.name).toEqual(createClinic.name);
    expect(createClinic.name).toEqual(fakeClinic.name);
    expect(createClinic.psychologistId).toEqual(fakeClinic.psychologistId);
  });

  it('should not create a new clinic if the name is already taken', async () => {
    await service.execute(fakeClinic);

    await expect(service.execute(fakeClinic)).rejects.toThrow(
      ConflictException
    );
  });
});
