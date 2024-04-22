import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsMobilePhone, IsObject, IsString, IsUUID } from 'class-validator';

class UpdatedPatientInfoOutputDto {
  @IsUUID()
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
  clinicId!: string;
}

export class UpdatePatientControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedPatient!: UpdatedPatientInfoOutputDto;
}
