import {
  Prisma,
  Appointment as PrismaAppointmentDto,
  PaymentMethod as PrismaPaymentMethod,
} from '@prisma/client';

import { AppointmentEntity } from '../../../core/domains/appointment/entities/appointment/entity';
import { CreateSingleAppointmentInputDto } from '../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdateAppointmentInfoInputDto } from '../../../core/domains/appointment/use-cases/update-appointment-info/update-appointment-info-dto';
import { PaymentMethod } from '../../../core/shared/interfaces/payments';

export class PostgresqlPrismaAppointmentMapper {
  static toDomain(raw: PrismaAppointmentDto): AppointmentEntity {
    return new AppointmentEntity({
      ...raw,
      paymentMethod: raw.paymentMethod as unknown as PaymentMethod,
    });
  }

  static toPrismaCreate(
    raw: CreateSingleAppointmentInputDto,
  ): Prisma.AppointmentCreateArgs {
    return {
      data: {
        online: raw.online,
        confirmed: raw.confirmed,
        cancelled: raw.cancelled,
        paymentMethod: raw.paymentMethod as unknown as PrismaPaymentMethod,
        date: new Date(raw.date),
        patientId: raw.patientId,
        psychologistId: raw.psychologistId,
        clinicId: raw.clinicId,
      },
    };
  }

  static toPrismaUpdate(
    raw: UpdateAppointmentInfoInputDto,
  ): Prisma.AppointmentUpdateArgs {
    return {
      data: {
        ...raw,
        done: raw.done as boolean,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
