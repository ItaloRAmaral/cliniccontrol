import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from "../use-cases/create-psychologist/create-psychologist-dto";

export abstract class PsychologistDatabaseRepository {
  abstract createPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity>;
  abstract findPsychologist(email: string): Promise<PsychologistEntity | null>;
  abstract deletePsychologist(email: string): Promise<void>
  abstract getPsychologists(): Promise<PsychologistEntity[]>
}
