import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';
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
  abstract deleteClinic(name: string, psychologistId: string): Promise<void>;
  abstract deleteAllClinicsByPsychologistId(
    psychologistId: string
  ): Promise<ClinicEntity[]>;
}
