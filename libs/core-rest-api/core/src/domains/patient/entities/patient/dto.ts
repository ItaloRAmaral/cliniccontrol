import {
  IsString,
  // IsMobilePhone,
  IsDate,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class PatientDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  CPF!: string;

  // @IsMobilePhone('pt-BR')
  // phone!: number;

  @IsNumber()
  phone!: number;

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
