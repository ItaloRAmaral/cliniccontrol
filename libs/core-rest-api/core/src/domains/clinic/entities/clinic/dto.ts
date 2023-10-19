import { IsDate, IsOptional, IsString } from 'class-validator';

export class ClinicDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  psychologistId!: string;

  @IsOptional()
  @IsString()
  address?: string | null;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
