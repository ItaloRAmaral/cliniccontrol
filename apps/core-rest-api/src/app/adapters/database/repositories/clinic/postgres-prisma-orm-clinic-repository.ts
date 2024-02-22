import { ConflictException, Injectable } from '@nestjs/common';
import { ClinicEntity } from '../../../../core/domains/clinic/entities/clinic/entity';
import { ClinicDatabaseRepository } from '../../../../core/domains/clinic/repositories/database-repository';
import { CreateClinicInputDto } from '../../../../core/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { DeletedClinicOutputDto } from '../../../../core/domains/clinic/use-cases/delete-clinic/dto';
import { UpdateClinicInputDto } from '../../../../core/domains/clinic/use-cases/update-clinic/update-clinic-dto';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { PostgreSqlPrismaOrmService } from '../../../database/infra/prisma/prisma.service';
import { PostgresqlPrismaClinicMapper } from '../../mappers/postgresql-prisma-clinic-mapper';

@Injectable()
export class PostgresqlPrismaOrmClinicRepository implements ClinicDatabaseRepository {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}
  async createClinic(clinic: CreateClinicInputDto): Promise<ClinicEntity> {
    const isClinicExists = await this.findClinicByNameAndPsychologistId(
      clinic.name,
      clinic.psychologistId,
    );

    if (isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const toPrismaEntity = PostgresqlPrismaClinicMapper.toPrismaCreate({
      ...clinic,
    });

    const newClinic =
      await this.postgreSqlPrismaOrmService['clinic'].create(toPrismaEntity);

    return PostgresqlPrismaClinicMapper.toDomain(newClinic);
  }

  async findClinicByNameAndPsychologistId(
    name: string,
    psychologistId: string,
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
    psychologistId: string,
  ): Promise<ClinicEntity[] | null> {
    console.log(psychologistId);
    throw new Error('Method not implemented.');
  }

  async getClinics(): Promise<ClinicEntity[]> {
    const clinics = await this.postgreSqlPrismaOrmService['clinic'].findMany();

    return PostgresqlPrismaClinicMapper.toDomainMany(clinics);
  }

  async updateClinic(newClinic: UpdateClinicInputDto): Promise<void> {
    const oldClinic = await this.findClinicById(newClinic.id);

    if (!oldClinic) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CONFLICTING_CREDENTIALS']);
    }

    const toPrismaEntity = PostgresqlPrismaClinicMapper.toPrismaUpdate(newClinic);

    await this.postgreSqlPrismaOrmService['clinic'].update(toPrismaEntity);
  }

  async deleteClinic(id: string): Promise<DeletedClinicOutputDto> {
    const isClinicExists = await this.findClinicById(id);

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
    };

    return responseObject;
  }

  async deleteAllClinicsByPsychologistId(
    psychologistId: string,
  ): Promise<ClinicEntity[]> {
    console.log(psychologistId);
    throw new Error('Method not implemented.');
  }
}
