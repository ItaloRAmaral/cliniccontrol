import { ConflictException, Injectable } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';

@Injectable()
export class DeletePsychologistService {
  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository
  ) {}

  async execute(email: string): Promise<void> {
    // Validate if Psychologist exists
    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(email);
    if (!isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    // Delete psychologist
    await this.psychologistDatabaseRepository.deletePsychologist(email);
  }
}
