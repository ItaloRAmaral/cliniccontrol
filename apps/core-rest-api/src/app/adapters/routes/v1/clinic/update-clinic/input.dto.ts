import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateClinicControllerParamsInputDto {
  @IsString()
  id!: string;
}

export class UpdateClinicControllerBodyInputDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  psychologistId?: string;

  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
