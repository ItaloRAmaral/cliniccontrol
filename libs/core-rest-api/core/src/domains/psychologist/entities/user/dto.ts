import { IsString, IsNumber, Min, IsDate, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export class PsychologistDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: string;

  @IsNumber()
  price?: number | null;

  @IsNumber()
  @Min(0)
  totalYearEarnings?: number;

  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  // @ValidateNested()
  // @Type(() => patientsDto)
  // patients?: patientsDto[];

  // TODO: apointments
  // @ValidateNested()
  // @Type(() => apoimentsDto)
  // apointments?: apoimentsDto[];
}
