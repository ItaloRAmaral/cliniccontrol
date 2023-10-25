import { IsString } from 'class-validator';

export class PsychologistLoginInfoDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
