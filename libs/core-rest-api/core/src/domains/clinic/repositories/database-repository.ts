import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';
import { UpdateClinicDto } from '../use-cases/update-clinic/update-clinic-dto';

export abstract class ClinicDatabaseRepository {
  abstract createClinic(clinic: CreateClinicDto): Promise<ClinicEntity>;
  abstract findClinic(name: string): Promise<ClinicEntity | null>;
  abstract getClinics(): Promise<ClinicEntity[]>;
  abstract deleteClinic(name: string): Promise<void>;
  abstract findClinicById(id: string): Promise<ClinicEntity | null>
  abstract updateClinic(clinic: UpdateClinicDto): Promise<void>
}
