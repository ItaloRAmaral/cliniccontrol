import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentInputDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentDateInputDto } from '../use-cases/update-appointment-date/update-appointment-date-dto';
import { UpdateAppointmentInfoInputDto } from '../use-cases/update-appointment-info/update-appointment-info-dto';

export abstract class AppointmentDatabaseRepository {
  abstract createSingleAppointment(
    appointment: CreateSingleAppointmentInputDto,
  ): Promise<AppointmentEntity>;
  abstract findSingleAppointmentByDate(
    appointmentDate: Date,
  ): Promise<AppointmentEntity | null>;
  abstract findSingleAppointmentById(
    appointmentId: string,
  ): Promise<AppointmentEntity | null>;
  abstract getAppointments(): Promise<AppointmentEntity[]>;
  abstract updateAppointmentInfo(
    newAppointmentInfo: UpdateAppointmentInfoInputDto,
  ): Promise<void>;
  abstract updateAppointmentDate(
    newAppointmentInfo: UpdatedAppointmentDateInputDto,
  ): Promise<void>;
  abstract deleteSingleAppointment(appointmentId: string): Promise<void>;
}
