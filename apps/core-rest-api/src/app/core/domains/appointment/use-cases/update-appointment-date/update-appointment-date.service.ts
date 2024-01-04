import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { UpdatedAppointmentDateDto } from './update-appointment-date-dto';

export class UpdateAppointmentDateService {
  constructor(private appointmentDatabaseRepository: AppointmentDatabaseRepository) {}

  async execute(newAppointmentInfo: UpdatedAppointmentDateDto): Promise<void> {
    // Validate props

    const updateAppointmentDateDtoInstance = plainToInstance(
      UpdatedAppointmentDateDto,
      newAppointmentInfo,
    );

    await applicationValidateOrReject(updateAppointmentDateDtoInstance);

    const oldAppointmentInfo =
      await this.appointmentDatabaseRepository.findSingleAppointmentById(
        newAppointmentInfo.id,
      );
    if (!oldAppointmentInfo) {
      throw new NotFoundException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    await this.appointmentDatabaseRepository.updateAppointmentDate(newAppointmentInfo);
  }
}
