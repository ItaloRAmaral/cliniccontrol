import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentDateDto } from '../use-cases/update-appointment-date/update-appointment-date-dto';
import { UpdateAppointmentInfoDto } from '../use-cases/update-appointment-info/update-appointment-info-dto';

export abstract class AppointmentDatabaseRepository {
  abstract createSingleAppointment(
    appointment: CreateSingleAppointmentDto
  ): Promise<AppointmentEntity>;
  abstract findSingleAppointmentByDate(
    appointmentDate: Date
  ): Promise<AppointmentEntity | null>;
  abstract findSingleAppointmentById(
    appointmentId: string
  ): Promise<AppointmentEntity | null>;
  abstract getAppointments(): Promise<AppointmentEntity[]>;
  abstract updateAppointmentInfo(
    newAppointmentInfo: UpdateAppointmentInfoDto
  ): Promise<void>;
  abstract updateAppointmentDate(
    newAppointmentInfo: UpdatedAppointmentDateDto
  ): Promise<void>;
  abstract deleteSingleAppointment(appointmentId: string): Promise<void>;
}
