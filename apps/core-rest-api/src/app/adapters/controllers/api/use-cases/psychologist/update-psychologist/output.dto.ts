import { IsDate, IsEnum, IsNumber, IsObject, IsString, Min } from 'class-validator';
import { Plan, Role } from '../../../../../../core/shared/interfaces/payments';

class UpdatePsychologistInfoOutputDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(Role)
  role!: Role;

  @IsNumber()
  price?: number | null;

  @IsEnum(Plan)
  plan!: Plan;

  @IsNumber()
  @Min(0)
  totalYearEarnings?: number | null;

  @IsNumber()
  @Min(0)
  totalMonthEarnings?: number | null;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date | null;
}

export class UpdatePsychologistControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedPsychologist!: UpdatePsychologistInfoOutputDto;
}
