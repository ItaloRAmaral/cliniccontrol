import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { CreateClinicService } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsCreateClinicService extends CreateClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
