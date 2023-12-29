import { IsString } from 'class-validator';

export class DeletePatientDto {
  @IsString()
  patientId!: string;

  @IsString()
  psychologistId!: string;
}
