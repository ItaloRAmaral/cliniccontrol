import { Replace } from '../../../shared/utils';
import { PsychologistDto } from '../entities/psychologist/dto';
import { CreatePsychologistDto } from '../use-cases/create-psychologist/create-psychologist-dto';

export type IPsychologistProps = Replace<
  PsychologistDto,
  { id?: string; createdAt?: Date }
>;

export type ICreatePsychologistServiceProps = Replace<
  CreatePsychologistDto,
  { id?: string; createdAt?: Date }
>;
