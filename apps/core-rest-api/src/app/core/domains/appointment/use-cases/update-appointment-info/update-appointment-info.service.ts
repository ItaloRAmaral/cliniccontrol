import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { UpdateAppointmentInfoInputDto } from './update-appointment-info-dto';

export class UpdateAppointmentInfoService {
  constructor(private appointmentDatabaseRepository: AppointmentDatabaseRepository) {}

  async execute(newAppointmentInfo: UpdateAppointmentInfoInputDto): Promise<void> {
    // Validate props types
    const updateAppointmentDtoInstance = plainToInstance(
      UpdateAppointmentInfoInputDto,
      newAppointmentInfo,
    );

    await applicationValidateOrReject(updateAppointmentDtoInstance);

    const oldAppointmentInfo =
      await this.appointmentDatabaseRepository.findSingleAppointmentById(
        newAppointmentInfo.id,
      );

    if (!oldAppointmentInfo) {
      throw new NotFoundException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    // Update
    await this.appointmentDatabaseRepository.updateAppointmentInfo(newAppointmentInfo);
  }
}
