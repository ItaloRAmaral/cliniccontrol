import { ConflictException, Injectable } from '@nestjs/common';
import { PATIENT_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';

import { PatientEntity } from '../../../../core/domains/patient/entities/patient/entity';
import { PatientDatabaseRepository } from '../../../../core/domains/patient/repositories/database-repository';
import { CreatePatientDto } from '../../../../core/domains/patient/use-cases/create-patient/create-patient-dto';
import { UpdatePatientDto } from '../../../../core/domains/patient/use-cases/update-patient/update-patient-dto';
import { PostgreSqlPrismaOrmService } from '../../infra/prisma/prisma.service';
import { PostgresqlPrismaPatientMapper } from '../../mappers/postgresql-prisma-patient-mapper';

@Injectable()
export class PostgresqlPrismaOrmPatientRepository implements PatientDatabaseRepository {
  constructor(private postgresqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async createPatient(patient: CreatePatientDto): Promise<PatientEntity> {
    const isPatientExists = await this.findPatientByEmail(patient.email);

    if (isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const toPrismaEntity = PostgresqlPrismaPatientMapper.toPrismaCreate({
      ...patient,
    });

    const newPatient =
      await this.postgresqlPrismaOrmService['patient'].create(toPrismaEntity);

    return PostgresqlPrismaPatientMapper.toDomain(newPatient);
  }

  async findPatientByEmail(email: string): Promise<PatientEntity | null> {
    const patient = await this.postgresqlPrismaOrmService['patient'].findUnique({
      where: {
        email: email,
      },
    });

    if (!patient) {
      return null;
    }

    return PostgresqlPrismaPatientMapper.toDomain(patient);
  }

  async findPatientById(id: string): Promise<PatientEntity | null> {
    const patient = await this.postgresqlPrismaOrmService['patient'].findUnique({
      where: {
        id: id,
      },
    });

    if (!patient) {
      return null;
    }

    return PostgresqlPrismaPatientMapper.toDomain(patient);
  }

  async getPatients(): Promise<PatientEntity[]> {
    const patients = await this.postgresqlPrismaOrmService['patient'].findMany();

    return patients.map((patient) => PostgresqlPrismaPatientMapper.toDomain(patient));
  }

  async updatePatient(newPatientInfo: UpdatePatientDto): Promise<void> {
    const oldPatientInfo = await this.findPatientById(newPatientInfo.id);

    if (!oldPatientInfo) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    const toPrismaEntity = PostgresqlPrismaPatientMapper.toPrismaUpdate({
      ...newPatientInfo,
    });

    await this.postgresqlPrismaOrmService['patient'].update(toPrismaEntity);
  }

  async deletePatient(email: string): Promise<void> {
    const isPatientExists = await this.findPatientByEmail(email);

    if (!isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    await this.postgresqlPrismaOrmService['patient'].delete({
      where: {
        email: email,
      },
    });
  }
}
