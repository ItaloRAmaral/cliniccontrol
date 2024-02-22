import { IsString } from 'class-validator';

export class UpdatePsychologistControllerOutputDto {
  @IsString()
  message!: string;
}
