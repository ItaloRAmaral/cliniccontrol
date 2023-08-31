/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { PatientEntity } from '../../entities/patient/entity';
import { ICreatePatientServiceProps } from '../../interfaces/patient';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { CreatePatientDto } from './create-patient-dto';

@Injectable()
export class CreatePatientService {
  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async execute(
    createPatientDto: ICreatePatientServiceProps
  ): Promise<PatientEntity> {
    // Validate
    const createPatientDtoInstance = plainToInstance(
      CreatePatientDto,
      createPatientDto
    );

    await applicationValidateOrReject(createPatientDtoInstance);

    const isPatientExists = await this.patientDatabaseRepository.findPatientByEmail(
      createPatientDto.email
    );

    if (isPatientExists) {
      throw new ConflictException(
        PATIENT_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']
      );
    }

    // Create
    const patient = await this.patientDatabaseRepository.createPatient(
      createPatientDto
    );

    return patient;
  }
}
