import { Injectable } from '@nestjs/common';

import { PsychologistDatabaseRepository } from '../../../../../core/domains/psychologist/repositories/database-repository';
import { UpdatePsychologistService } from '../../../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist.service';

@Injectable()
export class NestjsUpdatePsychologistService extends UpdatePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
