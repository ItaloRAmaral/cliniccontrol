import { Injectable } from '@nestjs/common';
import { PsychologistDatabaseRepository } from '../../../../../../core/domains/psychologist/repositories/database-repository';
import { AuthenticatePsychologistService } from '../../../../../../core/domains/psychologist/use-cases/authenticate-psychologist/authenticate-psychologist.service';

@Injectable()
export class NestjsAuthenticatePsychologistService extends AuthenticatePsychologistService {
  constructor(psychologistDatabaseRepository: PsychologistDatabaseRepository) {
    super(psychologistDatabaseRepository);
  }
}
