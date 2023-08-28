import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { UpdatedAppointmentInfoDto } from './update-appointment-dto';

@Injectable()
export class UpdateAppointmentInfoService {
  constructor(
    private appointmentDatabaseRepository: AppointmentDatabaseRepository
  ) {}

  async execute(newAppointmentInfo: UpdatedAppointmentInfoDto): Promise<void> {
    // Validate props types
    const updatePatientDtoInstance = plainToInstance(
      UpdatedAppointmentInfoDto,
      newAppointmentInfo
    );

    await applicationValidateOrReject(updatePatientDtoInstance);

    const oldAppointmentInfo =
      await this.appointmentDatabaseRepository.findSingleAppointmentById(
        newAppointmentInfo.id
      );

    if (!oldAppointmentInfo) {
      throw new ConflictException(
        APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']
      );
    }

    // Update
    await this.appointmentDatabaseRepository.updateAppointmentInfo(
      newAppointmentInfo
    );
  }
}
