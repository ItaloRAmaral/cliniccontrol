import { Replace } from '../../../shared/utils';
import { PatientAppointmentRegistryDto } from '../entities/registry/dto';

export type IPatientAppointmentRegistryProps = Replace<
  PatientAppointmentRegistryDto,
  { id?: string; createdAt?: Date }
>;

export interface ICreatePatientAppointmentRegistry {
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
