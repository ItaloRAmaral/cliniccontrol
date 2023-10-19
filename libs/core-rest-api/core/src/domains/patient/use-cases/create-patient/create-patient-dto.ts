import { IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

export class CreatePatientDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  CPF!: string;

  @IsMobilePhone('pt-BR')
  phone!: string;

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @IsString()
  psychologistId!: string;

  @IsString()
  clinicId!: string;
}
