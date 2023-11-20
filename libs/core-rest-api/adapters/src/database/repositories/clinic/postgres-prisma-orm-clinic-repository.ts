import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { ClinicDatabaseRepository } from '@clinicControl/core-rest-api/core/src/domains/clinic/repositories/database-repository';
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { DeletedClinicInfo } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/delete-clinic/dto';
import { UpdateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/update-clinic/update-clinic-dto';
import { CLINIC_ERROR_MESSAGES } from '@clinicControl/core-rest-api/core/src/shared/errors/error-messages';
import { ConflictException, Injectable } from '@nestjs/common';
import { PostgreSqlPrismaOrmService } from '../../../database/infra/prisma/prisma.service';
import { PostgresqlPrismaClinicMapper } from '../../mappers/postgresql-prisma-clinic-mapper';

@Injectable()
export class PostgresqlPrismaOrmClinicRepository implements ClinicDatabaseRepository {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}
  async createClinic(clinic: CreateClinicDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findClinicByNameAndPsychologistId(
      clinic.name,
      clinic.psychologistId
    );

    if (isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const toPrismaEntity = PostgresqlPrismaClinicMapper.toPrismaCreate({
      ...clinic,
    });

    const newClinic = await this.postgreSqlPrismaOrmService['clinic'].create(
      toPrismaEntity
    );

    return PostgresqlPrismaClinicMapper.toDomain(newClinic);
  }

  async findClinicByNameAndPsychologistId(
    name: string,
    psychologistId: string
  ): Promise<ClinicEntity | null> {
    const clinic = await this.postgreSqlPrismaOrmService['clinic'].findFirst({
      where: {
        name,
        psychologistId: psychologistId,
      },
    });

    if (!clinic) {
      return null;
    }

    return PostgresqlPrismaClinicMapper.toDomain(clinic);
  }

  async findClinicById(id: string): Promise<ClinicEntity | null> {
    const clinic = await this.postgreSqlPrismaOrmService['clinic'].findUnique({
      where: {
        id,
      },
    });

    if (!clinic) {
      return null;
    }

    return PostgresqlPrismaClinicMapper.toDomain(clinic);
  }

  async findClinicByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[] | null> {
    throw new Error('Method not implemented.');
  }

  async getClinics(): Promise<ClinicEntity[]> {
    const clinics = await this.postgreSqlPrismaOrmService['clinic'].findMany();

    return PostgresqlPrismaClinicMapper.toDomainMany(clinics);
  }

  async updateClinic(newClinic: UpdateClinicDto): Promise<void> {
    const oldClinic = await this.findClinicById(newClinic.id);

    if (!oldClinic) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const toPrismaEntity = PostgresqlPrismaClinicMapper.toPrismaUpdate(newClinic);

    await this.postgreSqlPrismaOrmService['clinic'].update(toPrismaEntity);
  }

  async deleteClinic(name: string, psychologistId: string): Promise<DeletedClinicInfo> {
    const isClinicExists = await this.findClinicByNameAndPsychologistId(
      name,
      psychologistId
    );

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    const clinicId = isClinicExists.id;
    const deletedClinic = await this.postgreSqlPrismaOrmService['clinic'].delete({
      where: {
        id: clinicId,
      },
    });

    const responseObject = {
      deletedClinic: PostgresqlPrismaClinicMapper.toDomain(deletedClinic),
    }

    return responseObject
  }

  async deleteAllClinicsByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[]> {
    throw new Error('Method not implemented.');
  }
}
