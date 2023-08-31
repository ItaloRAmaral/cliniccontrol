import { ConflictException, Injectable } from '@nestjs/common';
import { CLINIC_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';
import { UpdateClinicDto } from '../use-cases/update-clinic/update-clinic-dto';
import { ClinicDatabaseRepository } from './database-repository';

@Injectable()
export class InMemoryClinicDatabaseRepository
  implements ClinicDatabaseRepository
{
  private clinics: ClinicEntity[] = [];

  async createClinic(clinic: CreateClinicDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findClinicByName(clinic.name);

    if (isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_NAME']);
    }

    const newClinic = new ClinicEntity(clinic);

    this.clinics.push(newClinic);

    return newClinic;
  }

  async findClinicByName(name: string): Promise<ClinicEntity | null> {
    return this.clinics.find((clinic) => clinic.name === name) ?? null;
  }

  async findClinicById(id: string): Promise<ClinicEntity | null> {
    return this.clinics.find((clinic) => clinic.id === id) ?? null
  }

  async getClinics(): Promise<ClinicEntity[]> {
    return this.clinics;
  }

  async updateClinic(newClinicInfo: UpdateClinicDto): Promise<void> {
    const oldClinicInfo = await this.findClinicById(newClinicInfo.id)

    if(!oldClinicInfo) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_DO_NOT_EXIST'])
    }

    const clinicIndex = this.clinics.findIndex((clinic) => {
      return clinic.id === newClinicInfo.id
    }) 
    const updatedClinic = Object.assign(oldClinicInfo, {
      ...newClinicInfo,
      updatedAt: new Date(),
    })

    this.clinics[clinicIndex] = updatedClinic;
  }

  async deleteClinic(name: string): Promise<void> {
    const isClinicExists = await this.findClinicByName(name);

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    this.clinics = this.clinics.filter((clinic) => clinic.name !== name);
  }
}
