import { IsEnum, IsMobilePhone, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaymentMethod } from '../../../../../core/shared/interfaces/payments';

export class UpdatePatientControllerBodyInputDto {
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

export class UpdatePatientControllerParamsInputDto {
  @IsUUID()
  id!: string;
}
