import { NotFoundException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { DeletedPsychologistInfo } from './dto';

export class DeletePsychologistService {
  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(email: string): Promise<DeletedPsychologistInfo> {
    // Validate if Psychologist exists
    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(email);

    if (!isPsychologistExists) {
      throw new NotFoundException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    // Delete psychologist
    return await this.psychologistDatabaseRepository.deletePsychologist(email);
  }
}
