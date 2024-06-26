import { ConflictException } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PatientEntity } from '../entities/patient/entity';
import { CreatePatientInputDto } from '../use-cases/create-patient/create-patient-dto';
import { UpdatePatientInputDto } from '../use-cases/update-patient/update-patient-dto';
import { PatientDatabaseRepository } from './database-repository';

export class InMemoryPatientDatabaseRepository implements PatientDatabaseRepository {
  private patients: PatientEntity[] = [];

  async createPatient(patient: CreatePatientInputDto): Promise<PatientEntity> {
    const isPatientExists = await this.findPatientByEmail(patient.email);

    if (isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const newPatient = new PatientEntity(patient);

    this.patients.push(newPatient);
    return newPatient;
  }

  async findPatientByEmail(email: string): Promise<PatientEntity | null> {
    return this.patients.find((patient) => patient.email === email) ?? null;
  }

  async findPatientById(patientId: string): Promise<PatientEntity | null> {
    return this.patients.find((patient) => patient.id === patientId) ?? null;
  }

  async getPatients(): Promise<PatientEntity[]> {
    return this.patients;
  }

  async updatePatient(newPatientInfo: UpdatePatientInputDto): Promise<PatientEntity> {
    const oldPatientInfo = await this.findPatientById(newPatientInfo.id);

    if (!oldPatientInfo) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    const patientIndex = this.patients.findIndex((patient) => {
      return patient.id === newPatientInfo.id;
    });

    const updatedPatient = Object.assign(oldPatientInfo, {
      ...newPatientInfo,
      updatedAt: new Date(),
    });

    this.patients[patientIndex] = updatedPatient;

    return updatedPatient;
  }

  async deletePatient(id: string): Promise<void> {
    const isPatientExists = await this.findPatientById(id);

    if (!isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    this.patients = this.patients.filter((patient) => patient.id !== id);
  }
}
