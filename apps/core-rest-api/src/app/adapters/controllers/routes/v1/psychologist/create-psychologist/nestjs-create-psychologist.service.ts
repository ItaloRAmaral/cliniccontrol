import { Injectable } from '@nestjs/common';
import { PsychologistDatabaseRepository } from '../../../../../../core/domains/psychologist/repositories/database-repository';
import { CreatePsychologistService } from '../../../../../../core/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';

@Injectable()
export class NestjsCreatePsychologistService extends CreatePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
