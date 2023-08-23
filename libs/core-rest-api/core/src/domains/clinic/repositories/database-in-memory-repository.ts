import { ConflictException, Injectable } from '@nestjs/common';
import { CLINIC_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';
import { ClinicDatabaseRepository } from './database-repository';

@Injectable()
export class InMemoryClinicDatabaseRepository
  implements ClinicDatabaseRepository
{
  private clinics: ClinicEntity[] = [];

  async createClinic(clinic: CreateClinicDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findClinic(clinic.name);

    if (isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_NAME']);
    }

    const newClinic = new ClinicEntity(clinic);

    this.clinics.push(newClinic);

    return newClinic;
  }

  async findClinic(name: string): Promise<ClinicEntity | null> {
    return this.clinics.find((clinic) => clinic.name === name) || null;
  }

  async getClinics(): Promise<ClinicEntity[]> {
    return this.clinics;
  }

  async deleteClinic(name: string): Promise<void> {
    const isClinicExists = await this.findClinic(name);

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_DO_NOT_EXIST']);
    }

    this.clinics = this.clinics.filter((clinic) => clinic.name !== name);
  }
}
