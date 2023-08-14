/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException, Injectable } from '@nestjs/common';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';
import { CreateClinicDto } from './create-clinic-dto';
import { plainToInstance } from 'class-transformer';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/shared/validators/validate-or-reject';
import { CLINIC_ERROR_MESSAGES } from '../../constants/error-messages';
import { ClinicEntity } from '../../entities/clinic/entity';

type IClinicProps = Replace<CreateClinicDto, { createdAt?: Date }>;

@Injectable()
export class CreateClinicService {
  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository
  ) {}

  async execute(createClinicDto: IClinicProps): Promise<ClinicEntity> {
    // Validate
    const createClinicDtoInstance = plainToInstance(
      CreateClinicDto,
      createClinicDto
    );

    await applicationValidateOrReject(createClinicDtoInstance);

    const isClinicExistent =
      await this.psychologistDatabaseRepository.findClinic(
        createClinicDto.name
      );

    if (isClinicExistent) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_NAME']);
    }

    // Create
    const createClinic = await this.psychologistDatabaseRepository.createClinic(
      createClinicDto
    );

    return createClinic;
  }
}
