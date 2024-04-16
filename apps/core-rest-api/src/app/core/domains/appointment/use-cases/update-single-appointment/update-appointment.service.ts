import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { AppointmentEntity } from '../../entities/appointment/entity';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { UpdateAppointmentDto } from './update-appointment-dto';

export class UpdateAppointmentService {
  constructor(private appointmentDatabaseRepository: AppointmentDatabaseRepository) {}

  async execute(newAppointmentInfo: UpdateAppointmentDto): Promise<AppointmentEntity> {
    // Validate props

    const updateAppointmentDateDtoInstance = plainToInstance(
      UpdateAppointmentDto,
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

    return await this.appointmentDatabaseRepository.updateAppointment(newAppointmentInfo);
  }
}
