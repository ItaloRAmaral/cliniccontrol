import { ConflictException } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { PatientAppointmentRegistryEntity } from '../entities/registry/entity';
import {
  ICreatePatientAppointmentRegistry,
  IFindPatientAppointmentRegistryByIdAndDate,
  IFindPatientAppointmentRegistryByIdAndPeriod,
  IUpdatePatientAppointmentRegistry,
} from '../interfaces/registry';
import { PatientAppointmentRegistryDatabaseRepository } from './database-repository';

export class InMemoryPatientAppointmentRegistryDatabaseRepository
  implements PatientAppointmentRegistryDatabaseRepository
{
  private patientAppointmentsRegistry: PatientAppointmentRegistryEntity[] = [];

  async createPatientAppointmentRegistry(
    params: ICreatePatientAppointmentRegistry
  ): Promise<PatientAppointmentRegistryEntity> {
    const newPatientAppointmentRegistry = new PatientAppointmentRegistryEntity(params);
    this.patientAppointmentsRegistry.push(newPatientAppointmentRegistry);

    return newPatientAppointmentRegistry;
  }

  async getAllAppointmentsRegistryByPatient(
    patientId: string
  ): Promise<PatientAppointmentRegistryEntity[] | null> {
    return (
      this.patientAppointmentsRegistry.filter(
        (patientAppointmentRegistry) => patientAppointmentRegistry.patientId === patientId
      ) ?? null
    );
  }

  async findPatientAppointmentRegistryById(
    id: string
  ): Promise<PatientAppointmentRegistryEntity | null> {
    return (
      this.patientAppointmentsRegistry.find(
        (patientAppointmentRegistry) => patientAppointmentRegistry.id === id
      ) ?? null
    );
  }

  async findPatientAppointmentRegistryByIdAndDate(
    params: IFindPatientAppointmentRegistryByIdAndDate
  ): Promise<PatientAppointmentRegistryEntity | null> {
    return (
      this.patientAppointmentsRegistry.find(
        (patientAppointmentRegistry) =>
          patientAppointmentRegistry.patientId === params.patientId &&
          patientAppointmentRegistry.createdAt === params.date
      ) ?? null
    );
  }

  async findPatientAppointmentRegistryByIdAndPeriod(
    params: IFindPatientAppointmentRegistryByIdAndPeriod
  ): Promise<PatientAppointmentRegistryEntity | null> {
    return (
      this.patientAppointmentsRegistry.find(
        (patientAppointmentRegistry) =>
          patientAppointmentRegistry.patientId === params.patientId &&
          patientAppointmentRegistry.createdAt >= params.startDate &&
          patientAppointmentRegistry.createdAt <= params.endDate
      ) ?? null
    );
  }

  async updatePatientAppointmentRegistry(
    params: IUpdatePatientAppointmentRegistry
  ): Promise<PatientAppointmentRegistryEntity> {
    const patientAppointmentRegistry = await this.findPatientAppointmentRegistryById(
      params.id
    );

    if (!patientAppointmentRegistry) {
      throw new ConflictException(
        PATIENT_ERROR_MESSAGES['PATIENT_APPOINTMENT_REGISTRY_NOT_FOUND']
      );
    }

    const patientAppointmentRegistryIndex = this.patientAppointmentsRegistry.findIndex(
      (patientAppointmentRegistry) => patientAppointmentRegistry.id === params.id
    );

    const updatedPatientAppointmentRegistry = Object.assign(patientAppointmentRegistry, {
      ...params,
      updatedAt: new Date(),
    });

    this.patientAppointmentsRegistry[patientAppointmentRegistryIndex] =
      updatedPatientAppointmentRegistry;

    return updatedPatientAppointmentRegistry;
  }

  async deletePatientAppointmentRegistry(id: string): Promise<void> {
    this.patientAppointmentsRegistry = this.patientAppointmentsRegistry.filter(
      (patientAppointmentRegistry) => patientAppointmentRegistry.id !== id
    );
  }
}
