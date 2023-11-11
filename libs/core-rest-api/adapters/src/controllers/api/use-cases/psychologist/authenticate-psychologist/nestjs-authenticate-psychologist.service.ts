import { PsychologistDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/psychologist/repositories/database-repository';
import { AuthenticatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/authenticate-psychologist/authenticate-psychologist.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsAuthenticatePsychologistService extends AuthenticatePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
