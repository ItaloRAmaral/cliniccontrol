import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { UpdatedAppointmentDateInputDto } from './update-appointment-date-dto';

export class UpdateAppointmentDateService {
  constructor(private appointmentDatabaseRepository: AppointmentDatabaseRepository) {}

  async execute(newAppointmentInfo: UpdatedAppointmentDateInputDto): Promise<void> {
    // Validate props

    const updateAppointmentDateDtoInstance = plainToInstance(
      UpdatedAppointmentDateInputDto,
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
