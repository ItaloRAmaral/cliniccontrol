import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateClinicService } from './create-clinic.service'
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';

import { randomUUID } from 'crypto';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';

describe('[clinic] Create Clinic Service', () => {
  const fakeClinic = {
    name: faker.company.name(),
    psychologistId: randomUUID(),
    city: faker.location.city(),
    state: faker.location.state(),
  };

  let service: CreateClinicService;
  let databaseRepository: PsychologistDatabaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClinicService,
        {
          provide: PsychologistDatabaseRepository,
          useClass: InMemoryPsychologistDatabaseRepository,
        },
      ],
    }).compile();

    service = module.get<CreateClinicService>(CreateClinicService);
    databaseRepository = module.get<PsychologistDatabaseRepository>(
      PsychologistDatabaseRepository
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
