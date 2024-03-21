import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CLINIC_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { ClinicEntity } from '../../entities/clinic/entity';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { UpdateClinicInputDto } from './update-clinic-dto';

export class UpdateClinicService {
  constructor(private clinicDatabaseRepository: ClinicDatabaseRepository) {}
  async execute(newClinicInfo: UpdateClinicInputDto): Promise<ClinicEntity> {
    const updateClinicDtoInstance = plainToInstance(UpdateClinicInputDto, newClinicInfo);
    await applicationValidateOrReject(updateClinicDtoInstance);

    const isClinicExists = await this.clinicDatabaseRepository.findClinicById(
      newClinicInfo.id,
    );
    if (!isClinicExists) {
      throw new NotFoundException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    return await this.clinicDatabaseRepository.updateClinic(newClinicInfo);
  }
}
