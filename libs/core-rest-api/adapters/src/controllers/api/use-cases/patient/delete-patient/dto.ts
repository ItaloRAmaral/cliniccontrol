import { IsString } from 'class-validator';

export class RouteParamsDto {
  @IsString()
  patientId!: string;
}
