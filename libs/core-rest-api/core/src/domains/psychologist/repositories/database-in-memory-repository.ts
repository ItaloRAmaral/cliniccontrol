import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PsychologistDatabaseRepository } from './database-repository';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';

const className = 'InMemoryPsychologistDatabaseRepository';

@Injectable()
export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];

  async createPsychologist(psychologist: CreatePsychologistDto) {
    const logger = new Logger(className);

    const psychologistAlreadyExists = await this.findUser(psychologist.email);

    if (psychologistAlreadyExists) {
      logger.error('Psychologist already exists');
      throw new ConflictException('Psychologist already exists');
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
