import { ClinicEntity } from '../../clinic/entities/clinic/entity';
import { CreateClinicDto } from '../../clinic/use-cases/create-clinic/create-clinic-dto';

export abstract class ClinicDatabaseRepository {
  abstract createClinic(clinic: CreateClinicDto): Promise<ClinicEntity>;
  abstract findClinicByName(name: string): Promise<ClinicEntity | null>;
  abstract getClinics(): Promise<ClinicEntity[]>;
  abstract deleteClinic(name: string): Promise<void>;
}
