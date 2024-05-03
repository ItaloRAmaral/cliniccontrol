import { IsEmail } from 'class-validator';

export class DeletePsychologistParamsInputDto {
  @IsEmail()
  email!: string;
}
