import { IsEmail } from 'class-validator';

export class DeletePsychologistControllerInputDto {
  @IsEmail()
  email!: string;
}
