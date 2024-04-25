import { Injectable } from '@nestjs/common';
import { ClinicDatabaseRepository } from '../../../../../core/domains/clinic/repositories/database-repository';
import { CreateClinicService } from '../../../../../core/domains/clinic/use-cases/create-clinic/create-clinic.service';

@Injectable()
export class NestjsCreateClinicService extends CreateClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
