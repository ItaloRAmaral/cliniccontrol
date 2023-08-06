import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export class ClinicDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  psychologistId!: string;

  @IsOptional()
  @IsNumber()
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
