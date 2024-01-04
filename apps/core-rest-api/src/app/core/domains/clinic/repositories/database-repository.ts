import { ClinicEntity } from '../entities/clinic/entity';
import { CreateClinicDto } from '../use-cases/create-clinic/create-clinic-dto';
import { DeletedClinicInfo } from '../use-cases/delete-clinic/dto';
import { UpdateClinicDto } from '../use-cases/update-clinic/update-clinic-dto';

export abstract class ClinicDatabaseRepository {
  abstract createClinic(clinic: CreateClinicDto): Promise<ClinicEntity>;
  abstract getClinics(): Promise<ClinicEntity[]>;
  abstract findClinicByNameAndPsychologistId(
    name: string,
    psychologistId: string
  ): Promise<ClinicEntity | null>;
  abstract findClinicByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[] | null>;
  abstract findClinicById(id: string): Promise<ClinicEntity | null>;
  abstract updateClinic(clinic: UpdateClinicDto): Promise<void>;
  abstract deleteClinic(id: string): Promise<DeletedClinicInfo>;
  abstract deleteAllClinicsByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[]>;
}
