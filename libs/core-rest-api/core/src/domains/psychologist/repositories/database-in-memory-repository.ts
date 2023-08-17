import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PsychologistDatabaseRepository } from './database-repository';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { CLINIC_ERROR_MESSAGES, PSYCHOLOGIST_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { ClinicEntity } from '../entities/clinic/entity';
import { CreateClinicDto } from '../use-cases/create-clinic/create-clinic-dto';


@Injectable()
export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];
  private clinics: ClinicEntity[] = [];

  async createPsychologist(psychologist: CreatePsychologistDto) {
    const isPsychologistExists = await this.findUser(psychologist.email);

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']
      );
    }

    const newPsychologist = new PsychologistEntity(psychologist);

    this.psychologists.push(newPsychologist);

    return newPsychologist;
  }

  async findUser(email: string) {
    return (
      this.psychologists.find((psychologist) => psychologist.email === email) ||
      null
    );
  }

  async createClinic(clinic: CreateClinicDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findUser(clinic.name);

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
}
