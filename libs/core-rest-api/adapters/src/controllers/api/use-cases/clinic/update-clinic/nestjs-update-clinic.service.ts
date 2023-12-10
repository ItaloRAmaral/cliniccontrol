import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { UpdateClinicService } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/update-clinic/update-clinic.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsUpdateClinicService extends UpdateClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
