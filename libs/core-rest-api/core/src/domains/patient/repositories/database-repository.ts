import { PatientEntity } from '../entities/patient/entity';
import { CreatePatientDto } from '../use-cases/create-patient/create-patient-dto';

export abstract class PatientDatabaseRepository {
  abstract createPatient(
    patient: CreatePatientDto
  ): Promise<PatientEntity>

  abstract findPatient(
    email: string
  ): Promise<PatientEntity | null>
}
