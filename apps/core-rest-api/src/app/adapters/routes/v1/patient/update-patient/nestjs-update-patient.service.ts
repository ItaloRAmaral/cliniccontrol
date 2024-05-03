import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '../../../../../core/domains/patient/repositories/database-repository';
import { UpdatePatientService } from '../../../../../core/domains/patient/use-cases/update-patient/update-patient.service';

@Injectable()
export class NestjsUpdatePatientService extends UpdatePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
