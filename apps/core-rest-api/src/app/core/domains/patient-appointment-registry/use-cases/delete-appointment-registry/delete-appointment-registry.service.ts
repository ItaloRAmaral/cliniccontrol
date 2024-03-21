import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientAppointmentRegistryInputDto } from './delete-appointment-registry-dto';

export class DeletePatientAppointmentRegistryService {
  constructor(
    private patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
  ) {}

  async execute(
    deletePatientAppointmentRegistryDto: DeletePatientAppointmentRegistryInputDto,
  ): Promise<void> {
    // Validate
    const DeletePatientAppointmentRegistryDtoInstance = plainToInstance(
      DeletePatientAppointmentRegistryInputDto,
      deletePatientAppointmentRegistryDto,
    );
    await applicationValidateOrReject(DeletePatientAppointmentRegistryDtoInstance);

    const isRegistryExists =
      await this.patientAppointmentRegistryDatabaseRepository.findPatientAppointmentRegistryById(
        deletePatientAppointmentRegistryDto.id,
      );

    if (!isRegistryExists) {
      throw new ConflictException(
        PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND'],
      );
    }

    await this.patientAppointmentRegistryDatabaseRepository.deletePatientAppointmentRegistry(
      deletePatientAppointmentRegistryDto.id,
    );
  }
}
