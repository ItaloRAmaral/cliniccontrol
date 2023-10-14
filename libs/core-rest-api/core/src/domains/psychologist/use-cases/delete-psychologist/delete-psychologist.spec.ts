import { makePsychologist } from '@clinicControl/root/libs/core-rest-api/adapters/tests/factories/make-psychologist';
import { ConflictException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { DeletePsychologistService } from './delete-psychologist.service';

describe('[psychologist] Delete Psychologist Service', () => {
  const fakePsychologist = makePsychologist();

  let service: DeletePsychologistService;
  let databaseRepository: PsychologistDatabaseRepository;

  beforeEach(async () => {
    databaseRepository = new InMemoryPsychologistDatabaseRepository();
    service = new DeletePsychologistService(databaseRepository);
  });

  it('should delete a new psychologist', async () => {
    const createPsychologist = await databaseRepository.createPsychologist(
      fakePsychologist
    );
    await service.execute(createPsychologist.email);
    const getPsychologists = await databaseRepository.getPsychologists();

    expect(getPsychologists).not.toContain(createPsychologist);
  });

  it('should throw error if psychologist does not exist', async () => {
    await expect(service.execute(fakePsychologist.email)).rejects.toThrow(
      new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      )
    );
  });
});
