import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClinicService } from './create-clinic.service'
import { ClinicDatabaseRepository } from '../../repositories/database-repository';

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClinicService,
        {
          provide: ClinicDatabaseRepository,
          useClass: InMemoryClinicDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<CreateClinicService>(CreateClinicService);
    databaseRepository = module.get<ClinicDatabaseRepository>(
      ClinicDatabaseRepository
    );
  });

  it('should create a new clinic', async () => {
    const createClinic = await service.execute(fakeClinic);

    const clinic = await databaseRepository.findClinic(createClinic.name);

    expect(clinic?.name).toEqual(createClinic.name);
    expect(createClinic.name).toEqual(fakeClinic.name);
    expect(createClinic.psychologistId).toEqual(fakeClinic.psychologistId);
  })
})
