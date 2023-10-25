import { PSYCHOLOGIST_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { ConflictException } from '@nestjs/common';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { PsychologistLoginInfoDto } from './psychologist-login-dto';

export class PsychologistLoginService {
  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(
    psychologistLoginDto: PsychologistLoginInfoDto
  ): Promise<PsychologistEntity> {
    const psychologist =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(
        psychologistLoginDto.email
      );

    // Validate
    if (!psychologist) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const comparePassword =

    // if (psychologist.password !== psychologistLoginDto.password) {
    //   throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['INVALID_CREDENTIALS']);
    // }



    return psychologist;
  }
}
