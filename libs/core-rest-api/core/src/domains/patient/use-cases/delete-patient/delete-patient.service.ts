/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException, Injectable } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PatientDatabaseRepository } from '../../repositories/database-repository';

@Injectable()
export class DeletePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(
    email: string
  ): Promise<void> {
    // Validate if patient exists in db
    const isPatientExists = await this.patientDatabaseRepository.findPatient(email);

    if (!isPatientExists) {
      throw new ConflictException(
        PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']
      );
    }

    // Delete patient
    await this.patientDatabaseRepository.deletePatient(email);
  }
}
