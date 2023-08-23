import { ConflictException, Injectable } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { PsychologistDatabaseRepository } from './database-repository';

@Injectable()
export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];

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

  async deletePsychologist(email: string): Promise<void> {
    const isPsychologistExists = await this.findPsychologist(
      email
    )

    if(!isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']
      );
    }

    this.psychologists = this.psychologists.filter((psychologists) => psychologists.email !== email)

  }

  async getPsychologists(): Promise<PsychologistEntity[]> {
    return this.psychologists
  }
}
