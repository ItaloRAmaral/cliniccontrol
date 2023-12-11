import { Replace } from '../../../shared/utils';
import { PatientAppointmentsRegistryDto } from '../entities/registry/dto';

export type IPatientAppointmentsRegistryProps = Replace<
  PatientAppointmentsRegistryDto,
  { id?: string; createdAt?: Date }
>;

export interface ICreatePatientAppointmentsRegistry {
  registry: object;
  psychologistId: string;
  patientId: string;
}

export interface IFindPatientAppointmentRegistryByIdAndDate {
  patientId: string;
  date: Date;
}

export interface IFindPatientAppointmentRegistryByIdAndPeriod {
  patientId: string;
  startDate: Date;
  endDate: Date;
}

export interface IUpdatePatientAppointmentRegistry {
  id: string;
  registry: object;
  updatedAt: Date;
}
