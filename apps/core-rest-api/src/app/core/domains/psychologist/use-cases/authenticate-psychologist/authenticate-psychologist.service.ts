import { UnauthorizedException } from '@nestjs/common';

import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { BcryptHasherService } from '../../../../shared/cryptography/use-cases/bcrypt-hasher.service';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { AuthenticatePsychologistInputDto } from './authenticate-psychologist-dto';

export class AuthenticatePsychologistService {
  private hasherService: BcryptHasherService = new BcryptHasherService();

  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(
    psychologistLoginDto: AuthenticatePsychologistInputDto,
  ): Promise<PsychologistEntity> {
    const psychologist =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(
        psychologistLoginDto.email,
      );

    if (!psychologist) {
      throw new UnauthorizedException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND'],
      );
    }

    const isPasswordValid = await this.hasherService.compare(
      psychologistLoginDto.password,
      psychologist.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(PSYCHOLOGIST_ERROR_MESSAGES['INVALID_CREDENTIALS']);
    }

    return psychologist;
  }
}
