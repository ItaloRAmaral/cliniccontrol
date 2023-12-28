import { fakerPT_BR as faker } from '@faker-js/faker';
import { ConflictException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { Plan, Role } from '../../../../shared/interfaces/payments';
import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
import { ClinicDatabaseRepository } from '../../../clinic/repositories/database-repository';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { DeletePsychologistService } from './delete-psychologist.service';

describe('[psychologist] Delete Psychologist Service', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: Role.PSYCHOLOGIST,
    plan: Plan.PREMIUM,
  };

  let service: DeletePsychologistService;
  let psychologistDatabaseRepository: PsychologistDatabaseRepository;
  let clinicDatabaseRepository: ClinicDatabaseRepository;

  beforeEach(async () => {
    clinicDatabaseRepository = new InMemoryClinicDatabaseRepository();
    psychologistDatabaseRepository = new InMemoryPsychologistDatabaseRepository(
      clinicDatabaseRepository
    );
    service = new DeletePsychologistService(psychologistDatabaseRepository);
  });

  it('should delete a new psychologist', async () => {
    const createPsychologist = await psychologistDatabaseRepository.createPsychologist(
      fakePsychologist
    );
    await service.execute(createPsychologist.email);
    const getPsychologists = await psychologistDatabaseRepository.getPsychologists();

    expect(getPsychologists).not.toContain(createPsychologist);
  });

  it('should throw error if psychologist does not exist', async () => {
    await expect(service.execute(fakePsychologist.email)).rejects.toThrow(
      new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'])
    );
  });
});
