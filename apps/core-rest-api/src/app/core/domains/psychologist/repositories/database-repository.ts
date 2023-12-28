import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { DeletedPsychologistInfo } from '../use-cases/delete-psychologist/dto';
import { UpdatePsychologistDto } from '../use-cases/update-psychologist/update-psychologist-dto';

export abstract class PsychologistDatabaseRepository {
  abstract createPsychologist(
    psychologist: CreatePsychologistDto
  ): Promise<PsychologistEntity>;
  abstract findPsychologistByEmail(email: string): Promise<PsychologistEntity | null>;
  abstract findPsychologistById(id: string): Promise<PsychologistEntity | null>;
  abstract getPsychologists(): Promise<PsychologistEntity[]>;
  abstract updatePsychologist(newPsychologist: UpdatePsychologistDto): Promise<void>;
  abstract deletePsychologist(email: string): Promise<DeletedPsychologistInfo>;
}
