import { ConflictException, Injectable } from '@nestjs/common';
import { PsychologistDatabaseRepository } from './database-repository';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { CLINIC_ERROR_MESSAGES, PSYCHOLOGIST_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';


@Injectable()
export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];
  private clinics: ClinicEntity[] = [];

  async createPsychologist(psychologist: CreatePsychologistDto) {
    const isPsychologistExists = await this.findPsychologist(
      psychologist.email
    );

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']
      );
    }

    const newPsychologist = new PsychologistEntity(psychologist);

    this.psychologists.push(newPsychologist);

    return newPsychologist;
  }

  async findPsychologist(email: string) {
    return (
      this.psychologists.find((psychologist) => psychologist.email === email) ||
      null
    );
  }
}
