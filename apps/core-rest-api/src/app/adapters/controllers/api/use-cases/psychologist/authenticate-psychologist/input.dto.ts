import { IsString } from 'class-validator';

export class AuthenticatePsychologistControllerInputDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
