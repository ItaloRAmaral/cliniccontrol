import { Injectable } from '@nestjs/common';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { CreatePatientAppointmentRegistryService } from '../../../../../core/domains/patient-appointment-registry/use-cases/create-appointment-registry/create-appointment-registry.service';
import { PatientDatabaseRepository } from '../../../../../core/domains/patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../../../core/domains/psychologist/repositories/database-repository';

@Injectable()
export class NestjsCreatePatientAppointmentRegistryService extends CreatePatientAppointmentRegistryService {
  constructor(
    psychologistDatabaseRepository: PsychologistDatabaseRepository,
    patientDatabaseRepository: PatientDatabaseRepository,
    patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
    )
    {
    super(
      psychologistDatabaseRepository,
      patientDatabaseRepository,
      patientAppointmentRegistryDatabaseRepository
    );
  }
}
