import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { DeleteClinicService } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/delete-clinic/delete-clinic.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestjsDeleteClinicService extends DeleteClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
