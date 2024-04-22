import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '../../../../../../../app/core/domains/patient/repositories/database-repository';
import { UpdatePatientService } from '../../../../../../../app/core/domains/patient/use-cases/update-patient/update-patient.service';

@Injectable()
export class NestjsUpdatePatientService extends UpdatePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
