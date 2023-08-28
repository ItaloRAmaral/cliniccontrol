import { PatientEntity } from '../entities/patient/entity';
import { CreatePatientDto } from '../use-cases/create-patient/create-patient-dto';
import { UpdatePatientDto } from '../use-cases/update-patient/update-patient-dto';

export abstract class PatientDatabaseRepository {
  abstract createPatient(patient: CreatePatientDto): Promise<PatientEntity>;
  abstract findPatient(email: string): Promise<PatientEntity | null>;
  abstract findPatientById(patientId: string): Promise<PatientEntity | null>;
  abstract getPatients(): Promise<PatientEntity[]>;
  abstract updatePatient(patient: UpdatePatientDto): Promise<void>;
  abstract deletePatient(email: string): Promise<void>;
}
