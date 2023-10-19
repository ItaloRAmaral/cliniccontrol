import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

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

  @IsOptional()
  @IsDate()
  confirmationDate?: Date | null;

  @IsBoolean()
  cancelled!: boolean;

  @IsOptional()
  @IsDate()
  cancellationDate?: Date | null;

  @IsBoolean()
  done!: boolean | null;

  @IsOptional()
  @IsBoolean()
  missed?: boolean | null;

  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
