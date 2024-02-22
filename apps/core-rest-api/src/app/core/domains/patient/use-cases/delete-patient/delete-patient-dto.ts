import { IsString } from 'class-validator';

export class DeletePatientInputDto {
  @IsString()
  patientId!: string;

  @IsString()
  psychologistId!: string;
}
