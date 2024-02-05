import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientAppointmentRegistryEntity } from '../../../../core/domains/patient-appointment-registry/entities/registry/entity';
import { ICreatePatientAppointmentRegistry, IFindPatientAppointmentRegistryByIdAndDate, IFindPatientAppointmentRegistryByIdAndPeriod, IUpdatePatientAppointmentRegistry } from '../../../../core/domains/patient-appointment-registry/interfaces/registry';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PostgreSqlPrismaOrmService } from "../../infra/prisma/prisma.service";
import { PostgresqlPrismaPatientAppointmentRegistryMapper } from '../../mappers/postgres-prisma-registry-mapper';

@Injectable()
export class PostgresqlPrismaOrmPatientAppointmentRegistryRepository
  implements PatientAppointmentRegistryDatabaseRepository
{
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async createPatientAppointmentRegistry(params: ICreatePatientAppointmentRegistry): Promise<PatientAppointmentRegistryEntity> {
    const toPrismaEntity =
    PostgresqlPrismaPatientAppointmentRegistryMapper.toPrismaCreate(params);

    const newPatientAppointmentRegistry = await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].create(
      toPrismaEntity
    );

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomain(newPatientAppointmentRegistry);
  }

  async getAllAppointmentsRegistryByPatient(patientId: string): Promise<PatientAppointmentRegistryEntity[] | null> {
    const patientAppointmentRegistries = await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].findMany({where: {patientId}})

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomainMany(patientAppointmentRegistries);
  }

  async findPatientAppointmentRegistryById(id: string): Promise<PatientAppointmentRegistryEntity | null> {
    const patientAppointmentRegistry = await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].findUnique({where: {id}})

    if (!patientAppointmentRegistry) {
      throw new NotFoundException(PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND']);
    }

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomain(patientAppointmentRegistry);
  }

  async findPatientAppointmentRegistryByIdAndDate(params: IFindPatientAppointmentRegistryByIdAndDate): Promise<PatientAppointmentRegistryEntity | null> {
    const patientAppointmentRegistry =
      await this.postgreSqlPrismaOrmService['patientAppointmentRegistry']
        .findFirst(
          { where:
            {
              patientId: params.patientId,
              createdAt: params.date
            },
          }
        )

    if (!patientAppointmentRegistry) {
      throw new NotFoundException(PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND']);
    }

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomain(patientAppointmentRegistry);
  }

  async findPatientAppointmentRegistryByIdAndPeriod(params: IFindPatientAppointmentRegistryByIdAndPeriod): Promise<PatientAppointmentRegistryEntity[] | []> {
    const patientAppointmentRegistries =
      await this.postgreSqlPrismaOrmService['patientAppointmentRegistry']
        .findMany(
          { where:
            {
              patientId: params.patientId,
              OR: [
                {
                  createdAt: {gte: params.startDate}
                },
                {
                  createdAt: {lte: params.endDate}
                },
              ]
            },
          }
        )

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomainMany(patientAppointmentRegistries);
  }

  async updatePatientAppointmentRegistry(params: IUpdatePatientAppointmentRegistry): Promise<PatientAppointmentRegistryEntity> {
    const oldPatientAppointmentRegistry = await this.findPatientAppointmentRegistryById(params.id);

    if (!oldPatientAppointmentRegistry) {
      throw new NotFoundException(PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND']);
    }

    const toPrismaEntity = PostgresqlPrismaPatientAppointmentRegistryMapper.toPrismaUpdate(params);
    const updatedRegistry = await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].update(toPrismaEntity);

    return PostgresqlPrismaPatientAppointmentRegistryMapper.toDomain(updatedRegistry);
  }

  async deletePatientAppointmentRegistry(id: string): Promise<void> {
    const isPatientAppointmentRegistryExists = await this.findPatientAppointmentRegistryById(
      id
    );

    if (!isPatientAppointmentRegistryExists) {
      throw new NotFoundException(PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES['REGISTRY_NOT_FOUND']);
    }

    const patientAppointmentRegistryId = isPatientAppointmentRegistryExists.id;

    await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].delete({
      where: {
        id: patientAppointmentRegistryId,
      },
    });
  }
}
