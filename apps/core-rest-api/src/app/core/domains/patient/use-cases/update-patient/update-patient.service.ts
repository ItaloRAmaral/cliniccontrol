import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePatientDto } from './update-patient-dto';

export class UpdatePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(newPatientInfo: UpdatePatientDto): Promise<void> {
    // Validate props types
    const updatePatientDtoInstance = plainToInstance(
      UpdatePatientDto,
      newPatientInfo
    );

    await applicationValidateOrReject(updatePatientDtoInstance);

    // Check if patient exists
    const isPatientExists =
      await this.patientDatabaseRepository.findPatientById(newPatientInfo.id);

    // If not exists, throw error
    if (!isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    // Create
    await this.patientDatabaseRepository.updatePatient(newPatientInfo);
  }
}
