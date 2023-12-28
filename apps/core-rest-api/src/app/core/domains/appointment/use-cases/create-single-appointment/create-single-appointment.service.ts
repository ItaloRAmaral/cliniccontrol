/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { AppointmentEntity } from '../../entities/appointment/entity';
import { ICreateAppointmentServiceProps } from '../../interfaces/appointment';
import { AppointmentDatabaseRepository } from '../../repositories/database-repository';
import { CreateSingleAppointmentDto } from './create-single-appointment-dto';

export class CreateSingleAppointmentService {
  constructor(private appointmentDatabaseRepository: AppointmentDatabaseRepository) {}

  async execute(
    createSingleAppointmentDto: ICreateAppointmentServiceProps
  ): Promise<AppointmentEntity> {
    // Validate
    const createSingleAppointmentDtoInstance = plainToInstance(
      CreateSingleAppointmentDto,
      createSingleAppointmentDto
    );

    await applicationValidateOrReject(createSingleAppointmentDtoInstance);

    const isAppointmentExist =
      await this.appointmentDatabaseRepository.findSingleAppointmentByDate(
        createSingleAppointmentDto.date
      );

    if (isAppointmentExist) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['CONFLICTING_DATE_TIME']);
    }

    // Create
    const createSingleAppointment =
      await this.appointmentDatabaseRepository.createSingleAppointment(
        createSingleAppointmentDto
      );

    return createSingleAppointment;
  }
}
