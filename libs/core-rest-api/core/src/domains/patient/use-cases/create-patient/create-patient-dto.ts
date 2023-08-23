import { IsDate, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  CPF!: string;

  @IsMobilePhone('pt-BR')
  phone!: string;

  @IsString()
  paymentMethod!: string;

  @IsString()
  psychologistId!: string;

  @IsString()
  clinicId!: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
