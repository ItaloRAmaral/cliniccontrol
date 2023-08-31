import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { ClinicEntity } from '../../entities/clinic/entity';
import { ICreateClinicServiceProps } from '../../interfaces/clinic';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { CreateClinicDto } from './create-clinic-dto';

@Injectable()
export class CreateClinicService {
  constructor(private clinicDatabaseRepository: ClinicDatabaseRepository) {}

  async execute(
    createClinicDto: ICreateClinicServiceProps
  ): Promise<ClinicEntity> {
    // Validate
    const createClinicDtoInstance = plainToInstance(
      CreateClinicDto,
      createClinicDto
    );

    await applicationValidateOrReject(createClinicDtoInstance);

    const isClinicExist = await this.clinicDatabaseRepository.findClinicByName(
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
