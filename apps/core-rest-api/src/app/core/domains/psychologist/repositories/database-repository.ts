import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistInputDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { DeletedPsychologistOutputDto } from '../use-cases/delete-psychologist/dto';
import { UpdatePsychologistInputDto } from '../use-cases/update-psychologist/update-psychologist-dto';

export abstract class PsychologistDatabaseRepository {
  abstract createPsychologist(
    psychologist: CreatePsychologistInputDto,
  ): Promise<PsychologistEntity>;
  abstract findPsychologistByEmail(email: string): Promise<PsychologistEntity | null>;
  abstract findPsychologistById(id: string): Promise<PsychologistEntity | null>;
  abstract getPsychologists(): Promise<PsychologistEntity[]>;
  abstract updatePsychologist(
    newPsychologist: UpdatePsychologistInputDto,
  ): Promise<PsychologistEntity>;
  abstract deletePsychologist(email: string): Promise<DeletedPsychologistOutputDto>;
}
