import { NotFoundException } from '@nestjs/common';
import { PATIENT_APPOINTMENT_REGISTRY_ERROR_MESSAGES } from 'apps/core-rest-api/src/app/shared/errors/error-messages';
import { PatientAppointmentRegistryEntity } from '../../../../core/domains/patient-appointment-registry/entities/registry/entity';
import { ICreatePatientAppointmentRegistry } from '../../../../core/domains/patient-appointment-registry/interfaces/registry';
import { PatientAppointmentRegistryDatabaseRepository } from '../../../../core/domains/patient-appointment-registry/repositories/database-repository';
import { PostgreSqlPrismaOrmService } from "../../infra/prisma/prisma.service";
import { PostgresqlPrismaPatientAppointmentRegistryMapper } from '../../mappers/postgres-prisma-registry-mapper';

@Injectable()
export class PostgresqlPrismaOrmRegistryRepository
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

}
