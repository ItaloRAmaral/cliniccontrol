import { IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../../../core/shared/interfaces/payments';

export class CreatePatientControllerBodyInputDto {
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
