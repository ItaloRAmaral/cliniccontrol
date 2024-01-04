import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Plan, Role } from '../../../../shared/interfaces/payments';

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
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsEnum(Plan)
  plan?: Plan;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalYearEarnings?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number;
}
