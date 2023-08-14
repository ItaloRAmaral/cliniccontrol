import { ClinicEntity } from '../entities/clinic/entity';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreateClinicDto } from '../use-cases/create-clinic/create-clinic-dto';
import { CreatePsychologistDto } from "../use-cases/create-psychologist/create-psychologist-dto";

export abstract class PsychologistDatabaseRepository {
  abstract createPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity>;
  abstract findUser(email: string): Promise<PsychologistEntity | null>;
  abstract createClinic(clinic: CreateClinicDto): Promise<ClinicEntity >
  abstract findClinic(name: string): Promise<ClinicEntity | null>
}
