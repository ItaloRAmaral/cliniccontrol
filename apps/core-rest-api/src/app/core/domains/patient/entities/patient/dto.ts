import { IsDate, IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

export class PatientDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  cpf!: string;

  @IsMobilePhone('pt-BR')
  telephone!: string;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsString()
  psychologistId!: string;

  @IsString()
  clinicId!: string;

  @IsOptional()
  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
