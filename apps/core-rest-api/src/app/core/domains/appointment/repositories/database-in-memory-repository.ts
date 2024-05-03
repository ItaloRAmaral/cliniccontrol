import { ConflictException } from '@nestjs/common';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { AppointmentEntity } from '../entities/appointment/entity';
import { CreateSingleAppointmentInputDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentDateInputDto } from '../use-cases/update-appointment-date/update-appointment-date-dto';
import { UpdateAppointmentInfoInputDto } from '../use-cases/update-appointment-info/update-appointment-info-dto';
import { UpdateAppointmentDto } from '../use-cases/update-single-appointment/update-appointment-dto';
import { AppointmentDatabaseRepository } from './database-repository';

export class InMemoryAppointmentDatabaseRepository
  implements AppointmentDatabaseRepository
{
  private appointments: AppointmentEntity[] = [];

  async createSingleAppointment(
    appointment: CreateSingleAppointmentInputDto,
  ): Promise<AppointmentEntity> {
    const isAppointmentExist = await this.findSingleAppointmentByDate(appointment.date);

    if (isAppointmentExist) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['CONFLICTING_DATE_TIME']);
    }

    const newAppointment = new AppointmentEntity(appointment);

    this.appointments.push(newAppointment);

    return newAppointment;
  }

  async findSingleAppointmentByDate(
    appointmentDate: Date,
  ): Promise<AppointmentEntity | null> {
    return (
      this.appointments.find((appointment) => appointment.date === appointmentDate) ??
      null
    );
  }

  async findSingleAppointmentById(
    appointmentId: string,
  ): Promise<AppointmentEntity | null> {
    return (
      this.appointments.find((appointment) => appointment.id === appointmentId) ?? null
    );
  }

  async getAppointments(): Promise<AppointmentEntity[]> {
    return this.appointments;
  }

  async updateAppointmentInfo(
    newAppointmentInfo: UpdateAppointmentInfoInputDto,
  ): Promise<void> {
    const oldAppointmentInfo = await this.findSingleAppointmentById(
      newAppointmentInfo.id,
    );

    if (!oldAppointmentInfo) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    const appointmentIndex = this.appointments.findIndex((appointment) => {
      return appointment.id === newAppointmentInfo.id;
    });

    const updatedAppointment = Object.assign(oldAppointmentInfo, {
      ...newAppointmentInfo,
      updatedAt: new Date(),
    });

    this.appointments[appointmentIndex] = updatedAppointment;
  }

  async updateAppointmentDate(
    newAppointmentInfo: UpdatedAppointmentDateInputDto,
  ): Promise<void> {
    const oldAppointmentInfo = await this.findSingleAppointmentById(
      newAppointmentInfo.id,
    );

    if (!oldAppointmentInfo) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    const appointmentIndex = this.appointments.findIndex((appointment) => {
      return appointment.id === newAppointmentInfo.id;
    });

    const updateAppointmentDate = Object.assign(oldAppointmentInfo, {
      ...newAppointmentInfo,
      updatedAt: new Date(),
    });

    this.appointments[appointmentIndex] = updateAppointmentDate;
  }

  async updateAppointment(
    newAppointmentInfo: UpdateAppointmentDto,
  ): Promise<AppointmentEntity> {
    const oldAppointmentInfo = await this.findSingleAppointmentById(
      newAppointmentInfo.id,
    );

    if (!oldAppointmentInfo) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    const appointmentIndex = this.appointments.findIndex((appointment) => {
      return appointment.id === newAppointmentInfo.id;
    });

    const updatedAppointment = Object.assign(oldAppointmentInfo, {
      ...newAppointmentInfo,
      updatedAt: new Date(),
    });

    this.appointments[appointmentIndex] = updatedAppointment;

    return updatedAppointment
  }

  async deleteSingleAppointment(appointmentId: string): Promise<void> {
    const isAppointmentExist = await this.findSingleAppointmentById(appointmentId);

    if (!isAppointmentExist) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    this.appointments = this.appointments.filter(
      (appointment) => appointment.id !== appointmentId,
    );
  }
}
