import { Replace } from '../../../../shared/utils';
import { PatientAppointmentRegistryDto, Registry } from '../entities/registry/dto';

export type IPatientAppointmentRegistryProps = Replace<
  PatientAppointmentRegistryDto,
  { id?: string; createdAt?: Date }
>;

export interface ICreatePatientAppointmentRegistry {
  registry: Registry;
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
  registry: Registry;
  updatedAt: Date;
}
