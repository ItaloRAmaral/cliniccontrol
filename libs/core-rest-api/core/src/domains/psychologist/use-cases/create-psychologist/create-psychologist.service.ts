import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { ICreatePsychologistServiceProps } from '../../interfaces/psychologist';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { CreatePsychologistDto } from './create-psychologist-dto';

@Injectable()
export class CreatePsychologistService {
  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository
  ) {}

  async execute(
    createPsychologistDto: ICreatePsychologistServiceProps
  ): Promise<PsychologistEntity> {
    // Validate
    const createPsychologistDtoInstance = plainToInstance(
      CreatePsychologistDto,
      createPsychologistDto
    );
    await applicationValidateOrReject(createPsychologistDtoInstance);

    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologist(
        createPsychologistDto.email
      );

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']
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
