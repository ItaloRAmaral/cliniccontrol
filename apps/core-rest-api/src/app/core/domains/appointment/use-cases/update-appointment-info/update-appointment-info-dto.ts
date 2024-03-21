import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

export class UpdateAppointmentInfoInputDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsBoolean()
  online?: boolean;

  @IsOptional()
  @IsBoolean()
  confirmed?: boolean;

  @IsOptional()
  @IsDate()
  confirmationDate?: Date | null;

  @IsOptional()
  @IsBoolean()
  cancelled?: boolean;

  @IsOptional()
  @IsDate()
  cancellationDate?: Date | null;

  @IsOptional()
  @IsBoolean()
  done?: boolean | null;

  @IsOptional()
  @IsBoolean()
  missed?: boolean | null;

  @IsOptional()
  @IsBoolean()
  paid?: boolean;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
}
