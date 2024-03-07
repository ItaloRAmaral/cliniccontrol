import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { PatientEntity } from '../../entities/patient/entity';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { UpdatePatientInputDto } from './update-patient-dto';

export class UpdatePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(newPatientInfo: UpdatePatientInputDto): Promise<PatientEntity> {
    // Validate props types
    const updatePatientDtoInstance = plainToInstance(
      UpdatePatientInputDto,
      newPatientInfo,
    );

    await applicationValidateOrReject(updatePatientDtoInstance);

    // Check if patient exists
    const isPatientExists = await this.patientDatabaseRepository.findPatientById(
      newPatientInfo.id,
    );

    // If not exists, throw error
    if (!isPatientExists) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    // Update
    return await this.patientDatabaseRepository.updatePatient(newPatientInfo);
  }
}
