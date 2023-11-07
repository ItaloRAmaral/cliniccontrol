import { PSYCHOLOGIST_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { UnauthorizedException } from '@nestjs/common';
import { BcryptHasherService } from '../../../../shared/cryptography/use-cases/bcrypt-hasher.service';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { AuthenticatePsychologistDto } from './authenticate-psychologist-dto';

export class AuthenticatePsychologistService {
  private hasherService: BcryptHasherService = new BcryptHasherService();

  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(
    psychologistLoginDto: AuthenticatePsychologistDto
  ): Promise<PsychologistEntity> {
    const psychologist =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(
        psychologistLoginDto.email
      );

    if (!psychologist) {
      throw new UnauthorizedException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    const isPasswordValid = await this.hasherService.compare(
      psychologistLoginDto.password,
      psychologist.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(PSYCHOLOGIST_ERROR_MESSAGES['INVALID_CREDENTIALS']);
    }

    return psychologist;
  }
}
