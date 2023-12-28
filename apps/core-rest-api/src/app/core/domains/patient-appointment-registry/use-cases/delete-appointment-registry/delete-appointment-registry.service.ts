import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  PATIENT_APPOINTMENT_REGISTRY_MESSAGES
} from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientAppointmentRegistryDto } from './delete-appointment-registry-dto';

export class DeletePatientAppointmentRegistryService {
  constructor(
    private patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository
  ) {}

  async execute(
    deletePatientAppointmentRegistryDto: DeletePatientAppointmentRegistryDto
  ): Promise<void> {
    // Validate
    const DeletePatientAppointmentRegistryDtoInstance = plainToInstance(
      DeletePatientAppointmentRegistryDto,
      deletePatientAppointmentRegistryDto
    );
    await applicationValidateOrReject(DeletePatientAppointmentRegistryDtoInstance);

    const isRegistryExists = await this.patientAppointmentRegistryDatabaseRepository.findPatientAppointmentRegistryById(
      deletePatientAppointmentRegistryDto.id
    );

    if(!isRegistryExists) {
      throw new ConflictException(PATIENT_APPOINTMENT_REGISTRY_MESSAGES['REGISTRY_NOT_FOUNT']);
    }

    await this.patientAppointmentRegistryDatabaseRepository.deletePatientAppointmentRegistry(deletePatientAppointmentRegistryDto.id)
  }
}
