import { IsString } from "class-validator";

export class CreatePatientAppointmentRegistryOutputDto {
  @IsString()
  message!: string;
}
