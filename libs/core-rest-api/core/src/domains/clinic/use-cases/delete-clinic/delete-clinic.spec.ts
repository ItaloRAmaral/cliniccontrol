import { fakerPT_BR as faker } from '@faker-js/faker';
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
    databaseRepository = new InMemoryClinicDatabaseRepository();
    service = new DeleteClinicService(databaseRepository);
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
