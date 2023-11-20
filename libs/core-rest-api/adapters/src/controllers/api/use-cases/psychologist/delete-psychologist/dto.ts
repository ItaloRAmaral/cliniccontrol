import { AssociatedClinics } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/delete-psychologist/dto';
import { IsEmail } from 'class-validator';

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
