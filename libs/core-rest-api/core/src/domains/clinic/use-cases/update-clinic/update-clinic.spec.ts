import { fakerPT_BR as faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { InMemoryClinicDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { CreateClinicDto } from '../create-clinic/create-clinic-dto';
import { UpdateClinicDto } from './update-clinic-dto';
import { UpdateClinicService } from './update-clinic.service';

describe('[clinic] Update Clinic Service', () => {
  const fakeClinic: CreateClinicDto = {
    name: faker.person.fullName(),
    city: faker.location.city(),
    state: faker.location.state(),
    psychologistId: randomUUID(),
  };

  let service: UpdateClinicService;
  let databaseRepository: ClinicDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryClinicDatabaseRepository();
    service = new UpdateClinicService(databaseRepository);
  });

  it('should update a clinic', async () => {
    const createClinic = await databaseRepository.createClinic(fakeClinic);

    const newClinicInfos: UpdateClinicDto = {
      id: createClinic.id,
      city: faker.location.city(),
    };

    await service.execute(newClinicInfos);

    const findClinic = await databaseRepository.findClinicById(createClinic.id);

    expect(findClinic).toEqual({
      ...createClinic,
      ...newClinicInfos,
    });

    expect(findClinic?.city).not.toBe(fakeClinic.city);
    expect(findClinic?.city).toBe(newClinicInfos.city);
  });

  it('should throw conflict exception if clinic do not exist', async () => {
    const newClinicInfos = {
      id: randomUUID(),
      city: faker.location.city(),
    };

    await expect(service.execute(newClinicInfos)).rejects.toThrow(
      new NotFoundException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']),
    );
  });
});
