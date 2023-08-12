import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class AppointmentDto {
  @IsString()
  id!: string;

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

  @IsDate()
  cancellationDate!: Date | null;

  @IsBoolean()
  done!: boolean | null;

  @IsOptional()
  @IsBoolean()
  missed?: boolean | null;

  @IsBoolean()
  paid!: boolean;

  @IsString()
  paymentMethod!: string;

  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
