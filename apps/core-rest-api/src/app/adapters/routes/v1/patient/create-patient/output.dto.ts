import { PaymentMethod } from '@prisma/client';
import { IsDate, IsEnum, IsMobilePhone, IsString } from 'class-validator';

export class CreatePatientControllerOutputDto {
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

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date | null;
}
