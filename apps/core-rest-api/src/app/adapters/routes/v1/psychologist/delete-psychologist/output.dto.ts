import { IsString } from 'class-validator';

export class DeletePsychologistControllerOutputDto {
  @IsString()
  message!: string;
}
