import { Injectable } from '@nestjs/common';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { UpdatePatientAppointmentRegistryService } from '../../../../../core/domains/patient-appointment-registry/use-cases/update-appointment-registry/update-appointment-registry.service';

@Injectable()
export class NestjsUpdatePatientAppointmentRegistryService extends UpdatePatientAppointmentRegistryService {
  constructor(
    patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
  ) {
    super(patientAppointmentRegistryDatabaseRepository);
  }
}
