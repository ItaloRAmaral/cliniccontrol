import { IsObject, IsString } from 'class-validator';

export class AuthenticatePsychologistControllerOutputDto {
  @IsObject()
  user!: {
    id: string;
    name: string;
    email: string;
  };

  @IsString()
  access_token!: string;
}
