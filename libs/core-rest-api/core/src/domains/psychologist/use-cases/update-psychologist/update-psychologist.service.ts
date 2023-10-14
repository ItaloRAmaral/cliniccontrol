import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePsychologistDto } from './update-psychologist-dto';

export class UpdatePsychologistService {
  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository
  ) {}

  async execute(updatePsychologist: UpdatePsychologistDto): Promise<void> {
    // Validate props types
    const updatePsychologistDtoInstance = plainToInstance(
      UpdatePsychologistDto,
      updatePsychologist
    );
    await applicationValidateOrReject(updatePsychologistDtoInstance);

    // Check if psychologist exists
    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistById(
        updatePsychologist.id
      );

    // If not exists, throw error
    if (!isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    // Create
    await this.psychologistDatabaseRepository.updatePsychologist(
      updatePsychologist
    );
  }
}
