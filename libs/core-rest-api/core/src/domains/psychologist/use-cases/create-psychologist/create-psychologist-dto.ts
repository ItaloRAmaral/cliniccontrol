import { Plan, Role } from '@prisma/client';
import { IsString } from 'class-validator';

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
