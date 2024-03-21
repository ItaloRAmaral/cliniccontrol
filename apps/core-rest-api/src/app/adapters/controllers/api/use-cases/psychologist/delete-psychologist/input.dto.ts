import { IsEmail } from 'class-validator';

export class DeletePsychologistControllerInputDto {
  @IsEmail()
  psychologistEmail!: string;
}
