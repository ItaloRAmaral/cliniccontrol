import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../use-cases/create-single-appointment/create-appointment-dto';

export abstract class AppointmentDatabaseRepository {
  abstract createSingleAppointment(
    appointment: CreateSingleAppointmentDto
  ): Promise<AppointmentEntity>;
  abstract findSingleAppointment(
    appointmentDate: Date
  ): Promise<AppointmentEntity | null>;
}
