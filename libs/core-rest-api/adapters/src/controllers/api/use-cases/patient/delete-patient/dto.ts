import { IsEmail } from 'class-validator';

export class RouteParamsDto {
  @IsEmail()
  patientId!: string;
}
