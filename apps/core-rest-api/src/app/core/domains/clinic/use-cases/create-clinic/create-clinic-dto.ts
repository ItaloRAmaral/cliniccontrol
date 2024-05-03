import { IsOptional, IsString } from 'class-validator';

export class CreateClinicInputDto {
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
}
