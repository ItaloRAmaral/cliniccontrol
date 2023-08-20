import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name!: string;

  @IsString()
  psychologistId!: string;

  @IsOptional()
  @IsString()
  adress?: string | null;

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
