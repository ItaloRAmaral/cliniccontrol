import { IsString } from "class-validator";

export class DeleteAppointmentOutputDto {
  @IsString()
  message!: string;
}
