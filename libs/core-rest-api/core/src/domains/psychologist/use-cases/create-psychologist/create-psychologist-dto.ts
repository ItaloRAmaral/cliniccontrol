// eslint-disable-next-line @nx/enforce-module-boundaries
// import { Role } from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import { Role } from '@prisma/client';
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
  plan!: string;
}
