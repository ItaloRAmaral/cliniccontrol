import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentInfoDto } from '../use-cases/update-appointment/update-appointment-dto';

export abstract class AppointmentDatabaseRepository {
  abstract createSingleAppointment(
    appointment: CreateSingleAppointmentDto
  ): Promise<AppointmentEntity>;
  abstract findSingleAppointmentByDate(
    appointmentDate: Date
  ): Promise<AppointmentEntity | null>;
  abstract getAppointments(): Promise<AppointmentEntity[]>;
  abstract findSingleAppointmentById(
    appointmentId: string
  ): Promise<AppointmentEntity | null>;
  abstract updateAppointmentInfo(
    newAppointmentInfo: UpdatedAppointmentInfoDto
  ): Promise<void>;
  abstract deleteSingleAppointment(appointmentId: string): Promise<void>;
}
