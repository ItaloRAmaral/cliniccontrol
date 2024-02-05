import { ConflictException, Injectable } from '@nestjs/common';
import { AppointmentEntity } from '../../../../core/domains/appointment/entities/appointment/entity';
import { AppointmentDatabaseRepository } from '../../../../core/domains/appointment/repositories/database-repository';
import { CreateSingleAppointmentDto } from '../../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdatedAppointmentDateDto } from '../../../../core/domains/appointment/use-cases/update-appointment-date/update-appointment-date-dto';
import { UpdateAppointmentInfoDto } from '../../../../core/domains/appointment/use-cases/update-appointment-info/update-appointment-info-dto';
import { APPOINTMENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PostgreSqlPrismaOrmService } from "../../infra/prisma/prisma.service";
import { PostgresqlPrismaAppointmentMapper } from '../../mappers/postgresql-prisma-appointment-mapper';

@Injectable()
export class PostgresqlPrismaOrmAppointmentRepository implements AppointmentDatabaseRepository {
  constructor(private postgresqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async findSingleAppointmentById(appointmentId: string): Promise<AppointmentEntity | null> {
    const appointment = await this.postgresqlPrismaOrmService['appointment'].findUnique({where: {
      id: appointmentId
    }})
    if (!appointment) {
      return null;
    }

    return PostgresqlPrismaAppointmentMapper.toDomain(appointment);
  }

  async findSingleAppointmentByDate(appointmentDate: Date): Promise<AppointmentEntity | null> {
    const appointment = await this.postgresqlPrismaOrmService['appointment'].findFirst({
      where: {
        date: appointmentDate,
      }
    })

    if (!appointment) {
      return null;
    }

    return PostgresqlPrismaAppointmentMapper.toDomain(appointment);
  }

  async createSingleAppointment(appointment: CreateSingleAppointmentDto): Promise<AppointmentEntity> {
    const isAppointmentExists = await this.findSingleAppointmentByDate(new Date(appointment.date));

    if (isAppointmentExists) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['CONFLICTING_DATE_TIME']);
    }

    const toPrismaEntity = PostgresqlPrismaAppointmentMapper.toPrismaCreate({
      ...appointment,
    });

    const newAppointment =
      await this.postgresqlPrismaOrmService['appointment'].create(toPrismaEntity);

    return PostgresqlPrismaAppointmentMapper.toDomain(newAppointment);
  }

  async getAppointments(): Promise<AppointmentEntity[]> {
    const appointments = await this.postgresqlPrismaOrmService['appointment'].findMany();

    return appointments.map((appointment) => PostgresqlPrismaAppointmentMapper.toDomain(appointment))
  }

  async updateAppointmentInfo(newAppointmentInfo: UpdateAppointmentInfoDto): Promise<void> {
    const oldAppointmentInfo = await this.findSingleAppointmentById(newAppointmentInfo.id);

    if (!oldAppointmentInfo) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    const toPrismaEntity = PostgresqlPrismaAppointmentMapper.toPrismaUpdate({
      ...newAppointmentInfo,
    });

    await this.postgresqlPrismaOrmService['appointment'].update(toPrismaEntity);
  }

  async updateAppointmentDate(newAppointmentInfo: UpdatedAppointmentDateDto): Promise<void> {
    const oldAppointmentInfo = await this.findSingleAppointmentById(newAppointmentInfo.id);

    if (!oldAppointmentInfo) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    const toPrismaEntity = PostgresqlPrismaAppointmentMapper.toPrismaUpdate({
      ...newAppointmentInfo,
    });

    await this.postgresqlPrismaOrmService['appointment'].update(toPrismaEntity);
  }

  async deleteSingleAppointment(appointmentId: string): Promise<void> {
    const isAppointmentExists = await this.findSingleAppointmentById(appointmentId);

    if (!isAppointmentExists) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND']);
    }

    await this.postgresqlPrismaOrmService['appointment'].delete({
      where: {
        id: appointmentId,
      },
    });
  }
}
