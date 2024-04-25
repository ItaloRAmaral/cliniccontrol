import { Injectable } from '@nestjs/common';

import { PsychologistDatabaseRepository } from '../../../../../core/domains/psychologist/repositories/database-repository';
import { DeletePsychologistService } from '../../../../../core/domains/psychologist/use-cases/delete-psychologist/delete-psychologist.service';

@Injectable()
export class NestjsDeletePsychologistService extends DeletePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
