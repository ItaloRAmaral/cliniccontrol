import { Injectable } from '@nestjs/common';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { DeletePatientAppointmentRegistryService } from '../../../../../../core/domains/patient-appointment-registry/use-cases/delete-appointment-registry/delete-appointment-registry.service';

@Injectable()
export class NestjsDeletePatientAppointmentRegistryService extends DeletePatientAppointmentRegistryService {
  constructor(
    patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
  ) {
    super(patientAppointmentRegistryDatabaseRepository);
  }
}
