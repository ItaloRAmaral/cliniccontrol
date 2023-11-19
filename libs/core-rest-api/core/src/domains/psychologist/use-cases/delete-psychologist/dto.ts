import { PsychologistEntity } from '../../entities/psychologist/entity';

export interface AssociatedClinics {
  id: string;
  name: string;
}

export interface DeletedPsychologistInfo {
  deletedPsychologist: PsychologistEntity;
  associatedClinics: AssociatedClinics[];
}
