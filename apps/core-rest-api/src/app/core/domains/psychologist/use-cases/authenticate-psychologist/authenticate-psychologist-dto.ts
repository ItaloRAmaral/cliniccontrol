import { IsString } from 'class-validator';

export class AuthenticatePsychologistInputDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
