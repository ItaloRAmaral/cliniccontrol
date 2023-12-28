import { IsEmail } from 'class-validator';
import { AssociatedClinics } from '../../../../../../core/domains/psychologist/use-cases/delete-psychologist/dto';

export class RouteParamsDto {
  @IsEmail()
  psychologistEmail!: string;
}

interface Response {
  message: string;
  data: {
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

export type IControllerResponse = Response | Error;
