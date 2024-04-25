import { PaymentMethod } from '@prisma/client';
import { IsBoolean, IsDate, IsEnum, IsObject, IsString } from 'class-validator';

class UpdatedAppointmentInfoOutputDto {
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
  confirmationDate?: Date | null;

  @IsBoolean()
  cancelled!: boolean;

  @IsDate()
  cancellationDate?: Date | null;

  @IsBoolean()
  done!: boolean | null;

  @IsBoolean()
  missed?: boolean | null;

  @IsBoolean()
  paid?: boolean;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date | null;
}

export class UpdateAppointmentControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedApointment!: UpdatedAppointmentInfoOutputDto
}
