import { IsString } from 'class-validator';

export class CreatePsychologistDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: string;

  @IsString()
  plan!: string | null;
}
