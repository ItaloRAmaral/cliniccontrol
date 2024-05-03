import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  PATIENT_ERROR_MESSAGES,
  PSYCHOLOGIST_ERROR_MESSAGES,
} from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientInputDto } from './delete-patient-dto';

export class DeletePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(deletePatientDto: DeletePatientInputDto): Promise<void> {
    const { id, psychologistId } = deletePatientDto;

    const createPatientDtoInstance = plainToInstance(
      DeletePatientInputDto,
      deletePatientDto,
    );

    await applicationValidateOrReject(createPatientDtoInstance);

    // Validate if patient exists in db
    const isPatientExists = await this.patientDatabaseRepository.findPatientById(id);

    if (!isPatientExists) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    if (isPatientExists.psychologistId !== psychologistId) {
      throw new UnauthorizedException(PSYCHOLOGIST_ERROR_MESSAGES['NOT_YOUR_PATIENT']);
    }

    // Delete patient
    await this.patientDatabaseRepository.deletePatient(id);
  }
}
