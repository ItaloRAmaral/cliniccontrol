import { IsOptional, IsString } from 'class-validator';

export class CreateClinicControllerInputDto {
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
