import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { DataEncrypterService } from '../../../../shared/cryptography/use-cases/data-encrypter.service';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePatientAppointmentRegistryDto } from './update-appointment-registry-dto';

export class UpdatePatientAppointmentRegistryService {
  private dataEncrypter: DataEncrypterService = new DataEncrypterService();

  constructor(
    private patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
  ) {}

  async execute(
    updatePatientAppointmentRegistryDto: UpdatePatientAppointmentRegistryDto,
  ): Promise<void> {
    // Validate
    const DeletePatientAppointmentRegistryDtoInstance = plainToInstance(
      UpdatePatientAppointmentRegistryDto,
      updatePatientAppointmentRegistryDto,
    );
    await applicationValidateOrReject(DeletePatientAppointmentRegistryDtoInstance);

    const isRegistryExists =
      await this.patientAppointmentRegistryDatabaseRepository.findPatientAppointmentRegistryById(
        updatePatientAppointmentRegistryDto.id,
      );

    if (!isRegistryExists) {
      throw new NotFoundException(
        PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND'],
      );
    }

    const encryptedRegistry = this.dataEncrypter.encrypt(
      updatePatientAppointmentRegistryDto.registry['observations']
    );

    await this.patientAppointmentRegistryDatabaseRepository.updatePatientAppointmentRegistry(
      {...updatePatientAppointmentRegistryDto,
        registry: {
          observations: encryptedRegistry,
        },
      }
    );
  }
}
