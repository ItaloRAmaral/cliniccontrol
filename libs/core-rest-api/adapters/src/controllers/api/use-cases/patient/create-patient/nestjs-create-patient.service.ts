import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/patient/repositories/database-repository';
import { CreatePatientService } from '@clinicControl/core-rest-api/core/src/domains/patient/use-cases/create-patient/create-patient.service';

@Injectable()
export class NestjsCreatePatientService extends CreatePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
