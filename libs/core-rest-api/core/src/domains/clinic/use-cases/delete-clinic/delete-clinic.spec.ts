import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { DeleteClinicService } from './delete-clinic.service';

import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InMemoryClinicDatabaseRepository } from '../../repositories/database-in-memory-repository';

describe('[clinic] Delete Clinic Service', () => {
  const fakeClinic = {
    name: faker.company.name(),
    psychologistId: randomUUID(),
    city: faker.location.city(),
    state: faker.location.state(),
  };

  let service: DeleteClinicService;
  let databaseRepository: ClinicDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClinicService,
        {
          provide: ClinicDatabaseRepository,
          useClass: InMemoryClinicDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteClinicService>(DeleteClinicService);
    databaseRepository = module.get<ClinicDatabaseRepository>(
      ClinicDatabaseRepository
    );
  });

  it('should delete a new clinic', async () => {
    const createClinic = await databaseRepository.createClinic(fakeClinic);

    await service.execute(createClinic.name);

    const getClinics = await databaseRepository.getClinics();

    expect(getClinics).not.toContain(createClinic);
  });

  it('should throw conflict exception if clinic do not exists', async () => {
    await expect(service.execute(fakeClinic.name)).rejects.toThrow(
      ConflictException
    );
  });
});
