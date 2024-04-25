import { IsString } from 'class-validator';

export class DeleteAppointmentControllerParamsInputDto {
  @IsString()
  id!: string;
}
