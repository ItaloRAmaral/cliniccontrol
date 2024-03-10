import { IsString } from "class-validator";

export class DeleteAppointmentInputDto {
  @IsString()
  appointmentId!: string;
}
