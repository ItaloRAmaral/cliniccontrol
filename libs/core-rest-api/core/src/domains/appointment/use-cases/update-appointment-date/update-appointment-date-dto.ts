import { IsDate, IsString } from "class-validator";

export class UpdatedAppointmentDateDto {
  @IsString()
  id!: string;

  @IsDate()
  date!: Date;
}