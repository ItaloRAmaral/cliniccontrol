/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@nestjs/common';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { plainToInstance } from 'class-transformer';
import { CreatePsychologistDto } from './create-psychologist-dto';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/shared/validators/validate-or-reject';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils/replace';

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

    // TODO: check if user already exists

    // Create
    const psychologist =
      await this.psychologistDatabaseRepository.createPsychologist(
        createPsychologistDto
      );

    console.log('Psychologist Created:', psychologist);

    return psychologist;
  }
}
