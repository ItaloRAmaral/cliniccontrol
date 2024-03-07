import { PatientEntity } from '../entities/patient/entity';
import { CreatePatientInputDto } from '../use-cases/create-patient/create-patient-dto';
import { UpdatePatientInputDto } from '../use-cases/update-patient/update-patient-dto';

export abstract class PatientDatabaseRepository {
  abstract createPatient(patient: CreatePatientInputDto): Promise<PatientEntity>;
  abstract findPatientByEmail(email: string): Promise<PatientEntity | null>;
  abstract findPatientById(patientId: string): Promise<PatientEntity | null>;
  abstract getPatients(): Promise<PatientEntity[]>;
  abstract updatePatient(patient: UpdatePatientInputDto): Promise<PatientEntity>;
  abstract deletePatient(patientId: string): Promise<void>;
}
