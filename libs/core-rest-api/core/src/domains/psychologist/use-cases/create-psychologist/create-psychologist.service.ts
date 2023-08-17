/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { plainToInstance } from 'class-transformer';
import { CreatePsychologistDto } from './create-psychologist-dto';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/shared/validators/validate-or-reject';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils/replace';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';

type IPsychologistProps = Replace<
  CreatePsychologistDto,
  { id?: string; createdAt?: Date }
>;

@Injectable()
export class CreatePsychologistService {
  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository
  ) {}

  async execute(
    createPsychologistDto: IPsychologistProps
  ): Promise<PsychologistEntity> {
    // Validate
    const createPsychologistDtoInstance = plainToInstance(
      CreatePsychologistDto,
      createPsychologistDto
    );
    await applicationValidateOrReject(createPsychologistDtoInstance);

    const isPsychologistExists = await this.psychologistDatabaseRepository.findUser(createPsychologistDto.email);

    if (isPsychologistExists) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']
      );
    }

    // Create
    const psychologist =
      await this.psychologistDatabaseRepository.createPsychologist(
        createPsychologistDto
      );

    return psychologist;
  }
}
