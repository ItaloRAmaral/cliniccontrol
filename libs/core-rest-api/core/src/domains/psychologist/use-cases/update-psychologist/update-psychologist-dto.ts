import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePsychologistDto {
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
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalYearEarnings?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number;
}
