import { ConflictException, Injectable } from '@nestjs/common';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../shared/errors/error-messages';
import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';
import { AppointmentDatabaseRepository } from './database-repository';

@Injectable()
export class InMemoryAppointmentDatabaseRepository
  implements AppointmentDatabaseRepository
{
  private appointments: AppointmentEntity[] = [];

  async createSingleAppointment(
    appointment: CreateSingleAppointmentDto
  ): Promise<AppointmentEntity> {
    const isAppointmentExist = await this.findSingleAppointmentByDate(
      appointment.date
    );

    if (isAppointmentExist) {
      throw new ConflictException(
        APPOINTMENT_ERROR_MESSAGES['CONFLICTING_DATE_TIME']
      );
    }

    const newAppointment = new AppointmentEntity(appointment);

    this.appointments.push(newAppointment);

    return newAppointment;
  }

  async findSingleAppointmentByDate(
    appointmentDate: Date
  ): Promise<AppointmentEntity | null> {
    return (
      this.appointments.find(
        (appointment) => appointment.date === appointmentDate
      ) ?? null
    );
  }

  async findSingleAppointmentById(
    appointmentId: string
  ): Promise<AppointmentEntity | null> {
    return (
      this.appointments.find((appointment) => appointment.id === appointmentId) ?? null
    )
  }


  async deleteSingleAppointment(appointmentId: string): Promise<void> {
    const isAppointmentExist = await this.findSingleAppointmentById(appointmentId)

    if(!isAppointmentExist) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND'])
    }

    this.appointments = this.appointments.filter((appointment) => appointment.id !== appointmentId)
  }

  async getAppointments(): Promise<AppointmentEntity[]> {
    return this.appointments
  }
}
