import { IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../../../shared/interfaces/payments';

export class UpdatePatientDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsMobilePhone('pt-BR')
  telephone?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsString()
  clinicId?: string;
}
