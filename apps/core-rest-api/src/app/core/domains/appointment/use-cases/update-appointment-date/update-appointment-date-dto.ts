import { IsDate, IsString } from 'class-validator';

export class UpdatedAppointmentDateInputDto {
  @IsString()
  id!: string;

  @IsDate()
  date!: Date;
}
