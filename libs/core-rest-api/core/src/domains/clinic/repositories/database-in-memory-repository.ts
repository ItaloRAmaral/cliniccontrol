import { ConflictException } from '@nestjs/common';
import { CLINIC_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';
import { DeletedClinicInfo } from '../use-cases/delete-clinic/dto';
import { UpdateClinicDto } from '../use-cases/update-clinic/update-clinic-dto';
import { ClinicDatabaseRepository } from './database-repository';

export class InMemoryClinicDatabaseRepository implements ClinicDatabaseRepository {
  private clinics: ClinicEntity[] = [];
  private deletedClinics: ClinicEntity[] = [];

  async createClinic(clinic: CreateClinicDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findClinicByNameAndPsychologistId(
      clinic.name,
      clinic.psychologistId
    );

    if (isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const newClinic = new ClinicEntity(clinic);

    this.clinics.push(newClinic);

    return newClinic;
  }

  async getClinics(): Promise<ClinicEntity[]> {
    return this.clinics;
  }

  async findClinicByNameAndPsychologistId(
    name: string,
    psychologistId: string
  ): Promise<ClinicEntity | null> {
    return (
      this.clinics.find(
        (clinic) => clinic.name === name && clinic.psychologistId === psychologistId
      ) ?? null
    );
  }

  async findClinicByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[] | null> {
    return (
      this.clinics.filter((clinic) => clinic.psychologistId === psychologistId) ?? null
    );
  }

  async findClinicById(id: string): Promise<ClinicEntity | null> {
    return this.clinics.find((clinic) => clinic.id === id) ?? null;
  }

  async updateClinic(newClinicInfo: UpdateClinicDto): Promise<void> {
    const oldClinicInfo = await this.findClinicById(newClinicInfo.id);

    if (!oldClinicInfo) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    const clinicIndex = this.clinics.findIndex((clinic) => {
      return clinic.id === newClinicInfo.id;
    });

    const updatedClinic = Object.assign(oldClinicInfo, {
      ...newClinicInfo,
      updatedAt: new Date(),
    });

    this.clinics[clinicIndex] = updatedClinic;
  }

  async deleteClinic(id: string): Promise<DeletedClinicInfo> {
    const isClinicExists = await this.findClinicById(
      id
    );

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    this.clinics = this.clinics.filter((clinic) => clinic.id !== id);
    return {
      deletedClinic: isClinicExists
    }
  }

  async deleteAllClinicsByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[]> {
    const isClinicExists = await this.findClinicByPsychologistId(psychologistId);

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    const deletedClinics = this.clinics.filter(
      (clinic) => clinic.psychologistId === psychologistId
    );

    this.clinics = this.clinics.filter(
      (clinic) => clinic.psychologistId !== psychologistId
    );

    return deletedClinics;
  }
}
