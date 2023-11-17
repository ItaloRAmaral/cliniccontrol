import { Injectable } from '@nestjs/common';

import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { DeletePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/delete-psychologist/delete-psychologist.service';

@Injectable()
export class NestjsDeletePsychologistService extends DeletePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
