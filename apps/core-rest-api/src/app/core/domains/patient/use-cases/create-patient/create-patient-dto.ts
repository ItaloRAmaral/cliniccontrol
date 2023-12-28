import { IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

export class CreatePatientDto {
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
}
