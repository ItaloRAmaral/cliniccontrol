import { IsString } from 'class-validator';

export class AuthenticatePsychologistDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
