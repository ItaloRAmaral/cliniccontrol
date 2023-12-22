import { IsEmail } from 'class-validator';

export class RouteParamsDto {
  @IsEmail()
  patientEmail!: string;
}
