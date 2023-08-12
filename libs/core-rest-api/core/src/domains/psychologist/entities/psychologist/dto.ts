import {
  IsString,
  IsNumber,
  Min,
  IsDate,
  IsOptional,
} from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  price?: number | null;

  @IsString()
  plan!: string | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalYearEarnings?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
