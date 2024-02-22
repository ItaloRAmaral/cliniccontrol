import { IsObject, IsString } from 'class-validator';
import { AssociatedClinics } from '../../../../../../core/domains/psychologist/use-cases/delete-psychologist/dto';

export class DeletePsychologistControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject()
  data!: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    associatedClinics: AssociatedClinics[];
    deletedAt: Date;
  };
}
