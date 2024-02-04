import { Prisma, PatientAppointmentRegistry as PrismaPatientAppointmentRegistryDto } from '@prisma/client';
import { Registry } from '../../../core/domains/patient-appointment-registry/entities/registry/dto';
import { PatientAppointmentRegistryEntity } from '../../../core/domains/patient-appointment-registry/entities/registry/entity';
import { CreatePatientAppointmentRegistryDto } from '../../../core/domains/patient-appointment-registry/use-cases/create-appointment-registry/create-appointment-registry-dto';
import { UpdatePatientAppointmentRegistryDto } from '../../../core/domains/patient-appointment-registry/use-cases/update-appointment-registry/update-appointment-registry-dto';

export class PostgresqlPrismaPatientAppointmentRegistryMapper {
  static toDomain(raw: PrismaPatientAppointmentRegistryDto): PatientAppointmentRegistryEntity {
    return new PatientAppointmentRegistryEntity({
      ...raw,
      registry: raw.registry as unknown as Registry
    });
  }

  static toDomainMany(raw: PrismaPatientAppointmentRegistryDto[]): PatientAppointmentRegistryEntity[] {
    return raw.map((patientAppointmentRegistry) => this.toDomain(patientAppointmentRegistry))
  }

  static toPrismaCreate(raw: CreatePatientAppointmentRegistryDto): Prisma.PatientAppointmentRegistryCreateArgs {
    return {
      data: {
        ...raw,
        registry: raw.registry as object
      }
    };
  }

  static toPrismaUpdate(raw: UpdatePatientAppointmentRegistryDto): Prisma.PatientAppointmentRegistryUpdateArgs {
    return {
      data: {
        ...raw,
        registry: raw.registry as object
      },
      where: {
        id: raw.id,
      },
    };
  }
}
