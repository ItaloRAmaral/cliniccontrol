import { IsString } from 'class-validator';

export class CreateAppointmentControllerOutputDto {
  @IsString()
  message!: string;
}
