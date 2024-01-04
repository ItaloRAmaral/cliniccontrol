import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CLINIC_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { UpdateClinicDto } from './update-clinic-dto';

export class UpdateClinicService {
  constructor(private clinicDatabaseRepository: ClinicDatabaseRepository) {}
  async execute(newClinicInfo: UpdateClinicDto): Promise<void> {
    const updateClinicDtoInstance = plainToInstance(UpdateClinicDto, newClinicInfo);
    await applicationValidateOrReject(updateClinicDtoInstance);

    const isClinicExists = await this.clinicDatabaseRepository.findClinicById(
      newClinicInfo.id,
    );
    if (!isClinicExists) {
      throw new NotFoundException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    await this.clinicDatabaseRepository.updateClinic(newClinicInfo);
  }
}
