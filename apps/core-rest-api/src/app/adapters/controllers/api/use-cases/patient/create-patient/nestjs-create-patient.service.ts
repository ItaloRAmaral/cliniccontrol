import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '../../../../../../core/domains/patient/repositories/database-repository';
import { CreatePatientService } from '../../../../../../core/domains/patient/use-cases/create-patient/create-patient.service';

@Injectable()
export class NestjsCreatePatientService extends CreatePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
