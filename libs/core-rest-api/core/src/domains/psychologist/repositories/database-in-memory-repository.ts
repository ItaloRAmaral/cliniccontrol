import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PsychologistDatabaseRepository } from './database-repository';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../constants/error-messages';

const className = 'InMemoryPsychologistDatabaseRepository';

@Injectable()
export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];

  async createPsychologist(psychologist: CreatePsychologistDto) {
    const isPsychologistExists = await this.findUser(psychologist.email);

    if (isPsychologistExists) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['CONFLICTING_EMAIL']);
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
}
