import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateSingleAppointmentDto {
  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsDate()
  date!: Date;

  @IsBoolean()
  online!: boolean;

  @IsString()
  clinicId!: string;

  @IsBoolean()
  confirmed!: boolean;

  @IsDate()
  confirmationDate!: Date | null;

  @IsBoolean()
  cancelled!: boolean;

  @IsString()
  paymentMethod!: string;
}
