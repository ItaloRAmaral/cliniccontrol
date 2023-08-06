import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from "../use-cases/create-psychologist/create-psychologist-dto";

export abstract class PsychologistDatabaseRepository {
  abstract createPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity>;
  abstract findUser(email: string): Promise<PsychologistEntity | null>;
}
