import { PsychologistEntity } from '../../entities/psychologist/entity';

export interface AssociatedClinics {
  id: string;
  name: string;
}

export interface DeletedPsychologistOutputDto {
  deletedPsychologist: PsychologistEntity;
  associatedClinics: AssociatedClinics[];
}
