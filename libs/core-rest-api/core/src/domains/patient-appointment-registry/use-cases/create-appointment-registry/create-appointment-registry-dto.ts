import { IsDate, IsJSON, IsOptional, IsString } from 'class-validator';

export class CreatePatientAppointmentRegistryDto {
  @IsJSON()
  registry!: object;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
