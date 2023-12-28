import {
  Prisma,
  Patient as PrismaPatientDto,
  PaymentMethod as PrismaPaymentMethod,
} from '@prisma/client';

import { PatientEntity } from '../../../core/domains/patient/entities/patient/entity';
import { CreatePatientDto } from '../../../core/domains/patient/use-cases/create-patient/create-patient-dto';
import { UpdatePatientDto } from '../../../core/domains/patient/use-cases/update-patient/update-patient-dto';
import { PaymentMethod } from '../../../core/shared/interfaces/payments';

export class PostgresqlPrismaPatientMapper {
  static toDomain(raw: PrismaPatientDto): PatientEntity {
    return new PatientEntity({
      ...raw,
      paymentMethod: raw.paymentMethod as unknown as PaymentMethod,
    });
  }

  static toPrismaCreate(raw: CreatePatientDto): Prisma.PatientCreateArgs {
    return {
      data: {
        ...raw,
        paymentMethod: raw.paymentMethod as unknown as PrismaPaymentMethod,
      },
    };
  }

  static toPrismaUpdate(raw: UpdatePatientDto): Prisma.PatientUpdateArgs {
    return {
      data: {
        ...raw,
        paymentMethod: raw.paymentMethod as unknown as PrismaPaymentMethod,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
