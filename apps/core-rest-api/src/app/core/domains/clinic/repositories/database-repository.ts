import { ClinicEntity } from '../entities/clinic/entity';
import { CreateClinicInputDto } from '../use-cases/create-clinic/create-clinic-dto';
import { DeletedClinicOutputDto } from '../use-cases/delete-clinic/dto';
import { UpdateClinicInputDto } from '../use-cases/update-clinic/update-clinic-dto';

export abstract class ClinicDatabaseRepository {
  abstract createClinic(clinic: CreateClinicInputDto): Promise<ClinicEntity>;
  abstract getClinics(): Promise<ClinicEntity[]>;
  abstract findClinicByNameAndPsychologistId(
    name: string,
    psychologistId: string,
  ): Promise<ClinicEntity | null>;
  abstract findClinicByPsychologistId(
    psychologistId: string,
  ): Promise<ClinicEntity[] | null>;
  abstract findClinicById(id: string): Promise<ClinicEntity | null>;
  abstract updateClinic(clinic: UpdateClinicInputDto): Promise<void>;
  abstract deleteClinic(id: string): Promise<DeletedClinicOutputDto>;
  abstract deleteAllClinicsByPsychologistId(
    psychologistId: string,
  ): Promise<ClinicEntity[]>;
}
