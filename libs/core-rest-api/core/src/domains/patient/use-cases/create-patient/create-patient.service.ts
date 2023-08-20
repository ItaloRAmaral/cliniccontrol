/* eslint-disable @nx/enforce-module-boundaries */
import { ConflictException,
  Injectable} from '@nestjs/common';
import { PatientDatabaseRepository } from '../../repositories/database-repository';
import { PatientEntity } from '../../entities/patient/entity';
import { plainToInstance } from 'class-transformer';
import { CreatePatientDto } from './create-patient-dto';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { Replace } from '@clinicControl/core-rest-api/core/src/shared/utils/replace';
import { PATIENT_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';

type IPatientProps = Replace<CreatePatientDto, {id?:string, createdAt?: Date}>

@Injectable()
export class CreatePatientService {
  constructor(
    private patientDatabaseRepository: PatientDatabaseRepository
  ) {}

  async execute(
    createPatientDto: IPatientProps
  ): Promise<PatientEntity> {
    // Validate
    const createPatientDtoInstance = plainToInstance(CreatePatientDto, createPatientDto)

    await applicationValidateOrReject(createPatientDtoInstance);

    const isPatientExists = await this.patientDatabaseRepository.findPatient(createPatientDto.email)

    if (isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['CONFLICTING_CREDENTIALS'])
    }

    // Create
    const patient = await this.patientDatabaseRepository.createPatient(createPatientDto)
    return patient
  }
}
