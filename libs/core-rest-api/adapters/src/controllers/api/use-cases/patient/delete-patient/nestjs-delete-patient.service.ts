import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/patient/repositories/database-repository';
import { DeletePatientService } from '@clinicControl/core-rest-api/core/src/domains/patient/use-cases/delete-patient/delete-patient.service';

@Injectable()
export class NestjsDeletePatientService extends DeletePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
