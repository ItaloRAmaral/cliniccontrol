import { IsString } from 'class-validator';

export class UpdateAppointmentControllerOutputDto {
  @IsString()
  message!: string;
}
