/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClinicDto } from './create-clinic-dto';
import { plainToInstance } from 'class-transformer';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { ClinicEntity } from '../../entities/clinic/entity';
import { ICreateClinicServiceProps } from '../../interfaces/clinic';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';

@Injectable()
export class CreateClinicService {
  constructor(
    private clinicDatabaseRepository: ClinicDatabaseRepository
  ) {}

  async execute(
    createClinicDto: ICreateClinicServiceProps
  ): Promise<ClinicEntity> {
    // Validate
    const createClinicDtoInstance = plainToInstance(
      CreateClinicDto,
      createClinicDto
    );

    await applicationValidateOrReject(createClinicDtoInstance);

    const isClinicExist = await this.clinicDatabaseRepository.findClinic(
      createClinicDto.name
    );

    if (isClinicExist) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_NAME']);
    }

    // Create
    const createClinic = await this.clinicDatabaseRepository.createClinic(
      createClinicDto
    );

    return createClinic;
  }
}
