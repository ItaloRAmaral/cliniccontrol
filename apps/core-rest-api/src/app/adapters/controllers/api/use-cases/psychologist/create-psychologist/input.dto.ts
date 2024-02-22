import { IsEnum, IsString } from 'class-validator';
import { Plan, Role } from '../../../../../../core/shared/interfaces/payments';

export class CreatePsychologistControllerInputDto {
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
