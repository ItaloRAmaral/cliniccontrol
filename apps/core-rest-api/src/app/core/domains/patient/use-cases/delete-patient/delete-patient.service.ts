import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_ERROR_MESSAGES, PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { DeletePatientDto } from './delete-patient-dto';

export class DeletePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(deletePatientDto: DeletePatientDto): Promise<void> {
    const { patientId, psychologistId } = deletePatientDto;

    const createPatientDtoInstance = plainToInstance(DeletePatientDto, deletePatientDto);

    await applicationValidateOrReject(createPatientDtoInstance);

    // Validate if patient exists in db
    const isPatientExists =
      await this.patientDatabaseRepository.findPatientById(patientId);

    if (!isPatientExists) {
      throw new NotFoundException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    if (isPatientExists.psychologistId !== psychologistId) {
      throw new UnauthorizedException(PSYCHOLOGIST_ERROR_MESSAGES['NOT_YOUR_PATIENT']);
    }

    // Delete patient
    await this.patientDatabaseRepository.deletePatient(patientId);
  }
}
