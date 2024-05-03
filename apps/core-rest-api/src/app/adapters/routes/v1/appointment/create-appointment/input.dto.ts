import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../../core/shared/interfaces/payments';

export class CreateSingleAppointmentControllerBodyInputDto {
  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsString()
  date!: string;

  @IsBoolean()
  online!: boolean;

  @IsString()
  clinicId!: string;

  @IsBoolean()
  confirmed!: boolean;

  @IsDate()
  @IsOptional()
  confirmationDate?: Date | null;

  @IsBoolean()
  cancelled!: boolean;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
