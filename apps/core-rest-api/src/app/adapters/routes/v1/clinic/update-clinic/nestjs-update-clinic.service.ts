import { Injectable } from '@nestjs/common';
import { ClinicDatabaseRepository } from '../../../../../core/domains/clinic/repositories/database-repository';
import { UpdateClinicService } from '../../../../../core/domains/clinic/use-cases/update-clinic/update-clinic.service';

@Injectable()
export class NestjsUpdateClinicService extends UpdateClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
