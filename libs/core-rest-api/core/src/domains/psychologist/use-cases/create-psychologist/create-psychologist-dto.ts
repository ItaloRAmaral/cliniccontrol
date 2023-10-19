import { IsEnum, IsString } from 'class-validator';
import { Plan, Role } from '../../../../shared/interfaces/payments';

export class CreatePsychologistDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(Role)
  role!: Role;

  @IsEnum(Plan)
  plan!: Plan;
}
