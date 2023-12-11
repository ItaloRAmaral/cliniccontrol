import { PatientAppointmentsRegistryEntity } from '../entities/registry/entity';
import {
  ICreatePatientAppointmentsRegistry,
  IFindPatientAppointmentRegistryByIdAndDate,
  IFindPatientAppointmentRegistryByIdAndPeriod,
  IUpdatePatientAppointmentRegistry,
} from '../interfaces/registry';

export abstract class PatientAppointmentsRegistryRepository {
  abstract createPatientAppointmentRegistry(
    params: ICreatePatientAppointmentsRegistry
  ): Promise<PatientAppointmentsRegistryEntity>;
  abstract getAllAppointmentsRegistryByPatient(
    patientId: string
  ): Promise<PatientAppointmentsRegistryEntity[] | null>;
  abstract findPatientAppointmentRegistryById(
    id: string
  ): Promise<PatientAppointmentsRegistryEntity | null>;
  abstract findPatientAppointmentRegistryByIdAndDate(
    params: IFindPatientAppointmentRegistryByIdAndDate
  ): Promise<PatientAppointmentsRegistryEntity | null>;
  abstract findPatientAppointmentRegistryByIdAndPeriod(
    params: IFindPatientAppointmentRegistryByIdAndPeriod
  ): Promise<PatientAppointmentsRegistryEntity | null>;
  abstract updatePatientAppointmentRegistry(
    params: IUpdatePatientAppointmentRegistry
  ): Promise<PatientAppointmentsRegistryEntity>;
  abstract deletePatientAppointmentRegistry(id: string): Promise<void>;
}
