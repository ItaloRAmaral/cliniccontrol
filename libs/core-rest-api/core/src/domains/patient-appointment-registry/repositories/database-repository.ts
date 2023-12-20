import { PatientAppointmentRegistryEntity } from '../entities/registry/entity';
import {
  ICreatePatientAppointmentRegistry,
  IFindPatientAppointmentRegistryByIdAndDate,
  IFindPatientAppointmentRegistryByIdAndPeriod,
  IUpdatePatientAppointmentRegistry,
} from '../interfaces/registry';

export abstract class PatientAppointmentRegistryDatabaseRepository {
  abstract createPatientAppointmentRegistry(
    params: ICreatePatientAppointmentRegistry
  ): Promise<PatientAppointmentRegistryEntity>;
  abstract getAllAppointmentsRegistryByPatient(
    patientId: string
  ): Promise<PatientAppointmentRegistryEntity[] | null>;
  abstract findPatientAppointmentRegistryById(
    id: string
  ): Promise<PatientAppointmentRegistryEntity | null>;
  abstract findPatientAppointmentRegistryByIdAndDate(
    params: IFindPatientAppointmentRegistryByIdAndDate
  ): Promise<PatientAppointmentRegistryEntity | null>;
  abstract findPatientAppointmentRegistryByIdAndPeriod(
    params: IFindPatientAppointmentRegistryByIdAndPeriod
  ): Promise<PatientAppointmentRegistryEntity | null>;
  abstract updatePatientAppointmentRegistry(
    params: IUpdatePatientAppointmentRegistry
  ): Promise<PatientAppointmentRegistryEntity>;
  abstract deletePatientAppointmentRegistry(id: string): Promise<void>;
}
