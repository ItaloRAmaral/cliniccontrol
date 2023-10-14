import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { CreatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsCreatePsychologistService extends CreatePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
