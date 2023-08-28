import { IsMobilePhone, IsOptional, IsString } from 'class-validator';
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
  CPF?: string;

  @IsOptional()
  @IsMobilePhone('pt-BR')
  phone?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsString()
  clinicId?: string;
}
