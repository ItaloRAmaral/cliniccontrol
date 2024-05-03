import { IsDate, IsString } from 'class-validator';

export class CreateClinicControllerOutputDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  psychologistId!: string;

  @IsString()
  address?: string | null;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date | null;
}
