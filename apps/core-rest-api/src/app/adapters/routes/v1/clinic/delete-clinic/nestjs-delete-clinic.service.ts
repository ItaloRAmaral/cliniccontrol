import { Injectable } from '@nestjs/common';
import { ClinicDatabaseRepository } from '../../../../../core/domains/clinic/repositories/database-repository';
import { DeleteClinicService } from '../../../../../core/domains/clinic/use-cases/delete-clinic/delete-clinic.service';

@Injectable()
export class NestjsDeleteClinicService extends DeleteClinicService {
  constructor(clinicDatabaseRepository: ClinicDatabaseRepository) {
    super(clinicDatabaseRepository);
  }
}
