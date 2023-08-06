import {
  IsString,
  IsMobilePhone,
  IsDate,
  IsOptional
} from 'class-validator';
// import { Type } from 'class-transformer';

export class patientDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  CPF!: string;

  @IsMobilePhone('pt-BR')
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

  @IsOptional()
  @IsDate()
  deletedAt?: Date | null;

  // TODO: apointments
  // @ValidateNested()
  // @Type(() => apoimentsDto)
  // apointments!: apoimentsDto[];
}
