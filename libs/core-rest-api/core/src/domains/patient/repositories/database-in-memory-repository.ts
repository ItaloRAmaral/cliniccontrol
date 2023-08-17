import { ConflictException,
  Injectable} from '@nestjs/common';
import { PatientDatabaseRepository } from '../repositories/database-repository'
import { PATIENT_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { PatientEntity } from '../entities/patient/entity';
import { CreatePatientDto } from '../use-cases/create-patient/create-patient-dto';


@Injectable()
export class InMemoryPatientDatabaseRepository implements PatientDatabaseRepository {
  private patients : PatientEntity[] = []

  async createPatient(
    patient: CreatePatientDto
  ): Promise<PatientEntity> {
    const isPatientExists = await this.findPatient(patient.email);

    if (isPatientExists) {
      throw new ConflictException(
        PATIENT_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']
      );
    }

    const newPatient = new PatientEntity(patient)

    this.patients.push(newPatient)
    return newPatient
  }


  async findPatient(email: string) : Promise<PatientEntity | null>{
    return (
      this.patients.find((patient) => patient.email === email) ||
      null
    );
  }

}
