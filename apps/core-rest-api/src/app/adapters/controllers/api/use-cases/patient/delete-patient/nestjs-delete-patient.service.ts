import { Injectable } from '@nestjs/common';

import { PatientDatabaseRepository } from '../../../../../../core/domains/patient/repositories/database-repository';
import { DeletePatientService } from '../../../../../../core/domains/patient/use-cases/delete-patient/delete-patient.service';

@Injectable()
export class NestjsDeletePatientService extends DeletePatientService {
  constructor(patientDatabaseRepository: PatientDatabaseRepository) {
    super(patientDatabaseRepository);
  }
}
