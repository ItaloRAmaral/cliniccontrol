import { IsString } from 'class-validator';

export class DeletePatientControllerInputDto {
  @IsString()
  patientId!: string;
}
