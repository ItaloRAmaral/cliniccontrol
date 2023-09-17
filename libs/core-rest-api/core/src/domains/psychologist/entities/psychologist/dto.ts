// eslint-disable-next-line @nx/enforce-module-boundaries
import { Role } from '@prisma/client';
import { IsDate, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
  role!: Role;

  @IsOptional()
  @IsNumber()
  price?: number | null;

  @IsString()
  plan!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalYearEarnings?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number | null;

  @IsOptional()
  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
