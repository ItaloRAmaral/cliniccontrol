import { IsOptional, IsString } from 'class-validator';

export class UpdateClinicDto {
  @IsString()
  id!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  psychologistId?: string;

  @IsOptional()
  @IsString()
  adress?: string | null;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;
}
