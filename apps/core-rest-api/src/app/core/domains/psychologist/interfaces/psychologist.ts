import { Replace } from '../../../../shared/utils';
import { PsychologistDto } from '../entities/psychologist/dto';

export type IPsychologistProps = Replace<
  PsychologistDto,
  { id?: string; createdAt?: Date }
>;
