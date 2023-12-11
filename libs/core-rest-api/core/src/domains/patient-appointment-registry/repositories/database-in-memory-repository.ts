import { ConflictException } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { PatientDatabaseRepository } from '../../patient/repositories/database-repository';
import { PatientAppointmentsRegistryEntity } from '../entities/registry/entity';
import {
  ICreatePatientAppointmentsRegistry,
  IFindPatientAppointmentRegistryByIdAndDate,
  IFindPatientAppointmentRegistryByIdAndPeriod,
  IUpdatePatientAppointmentRegistry,
} from '../interfaces/registry';
import { PatientAppointmentsRegistryRepository } from './database-repository';

export class InMemoryPatientAppointmentsRegistryRepository
  implements PatientAppointmentsRegistryRepository
{
  private patientAppointmentsRegistry: PatientAppointmentsRegistryEntity[] = [];

  constructor(private patientDatabaseRepository: PatientDatabaseRepository) {}

  async createPatientAppointmentRegistry(
    params: ICreatePatientAppointmentsRegistry
  ): Promise<PatientAppointmentsRegistryEntity> {
    const isPatientExists = await this.patientDatabaseRepository.findPatientById(
      params.patientId
    );

    if (!isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    const newPatientAppointmentRegistry = new PatientAppointmentsRegistryEntity(params);
    this.patientAppointmentsRegistry.push(newPatientAppointmentRegistry);

    return newPatientAppointmentRegistry;
  }

  async getAllAppointmentsRegistryByPatient(
    patientId: string
  ): Promise<PatientAppointmentsRegistryEntity[] | null> {
    return (
      this.patientAppointmentsRegistry.filter(
        (patientAppointmentRegistry) => patientAppointmentRegistry.patientId === patientId
      ) ?? null
    );
  }

  async findPatientAppointmentRegistryById(
    id: string
  ): Promise<PatientAppointmentsRegistryEntity | null> {
    return (
      this.patientAppointmentsRegistry.find(
        (patientAppointmentRegistry) => patientAppointmentRegistry.id === id
      ) ?? null
    );
  }

  async findPatientAppointmentRegistryByIdAndDate(
    params: IFindPatientAppointmentRegistryByIdAndDate
  ): Promise<PatientAppointmentsRegistryEntity | null> {
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
  ): Promise<PatientAppointmentsRegistryEntity | null> {
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
  ): Promise<PatientAppointmentsRegistryEntity> {
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
