import { IsDate, IsJSON, IsOptional, IsString } from 'class-validator';

export class PatientAppointmentRegistryDto {
  @IsString()
  id!: string;

  @IsJSON()
  registry!: object;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsOptional()
  @IsDate()
  createdAt!: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
