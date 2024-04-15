import { IsString } from 'class-validator';

export class DeletePatientControllerInputDto {
  @IsString()
  patientId!: string;
}

export class DeletePatientControllerParamsInputDto {
  @IsString()
  id!: string;
}
