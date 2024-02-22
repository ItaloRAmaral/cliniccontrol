import { ConflictException, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { BcryptHasherService } from '../../../../shared/cryptography/use-cases/bcrypt-hasher.service';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePsychologistInputDto } from './update-psychologist-dto';

export class UpdatePsychologistService {
  private hasherService: BcryptHasherService = new BcryptHasherService();

  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(updatePsychologist: UpdatePsychologistInputDto): Promise<void> {
    // Validate
    const updatePsychologistDtoInstance = plainToInstance(
      UpdatePsychologistInputDto,
      updatePsychologist,
    );
    await applicationValidateOrReject(updatePsychologistDtoInstance);

    // Check if psychologist exists
    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistById(
        updatePsychologist.id,
      );

    // If not exists, throw error
    if (!isPsychologistExists) {
      throw new NotFoundException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    if (updatePsychologist.email === isPsychologistExists.email) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['SAME_EMAIL']);
    }

    // Check if email is already in use
    if (
      updatePsychologist.email &&
      updatePsychologist.email !== isPsychologistExists.email
    ) {
      const isEmailAlreadyInUse =
        await this.psychologistDatabaseRepository.findPsychologistByEmail(
          updatePsychologist.email,
        );

      if (isEmailAlreadyInUse) {
        throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']);
      }
    }

    // Hash password if password is provided
    if (updatePsychologist.password) {
      const isPasswordTheSame = await this.hasherService.compare(
        updatePsychologist.password,
        isPsychologistExists.password,
      );

      if (isPasswordTheSame) {
        throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['SAME_PASSWORD']);
      }

      const hashedPassword = await this.hasherService.hash(updatePsychologist.password);
      updatePsychologist.password = hashedPassword;
    }

    // Update
    await this.psychologistDatabaseRepository.updatePsychologist(updatePsychologist);
  }
}
