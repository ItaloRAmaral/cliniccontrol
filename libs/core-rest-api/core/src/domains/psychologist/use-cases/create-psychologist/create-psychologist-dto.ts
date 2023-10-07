import { IsString } from 'class-validator';
import { Plan, Role } from '../../../../shared/interfaces/payments';

export class CreatePsychologistDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  role!: Role;

  @IsString()
  plan!: Plan;
}
