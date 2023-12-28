import { Plan } from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePsychologistControllerDto {
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
