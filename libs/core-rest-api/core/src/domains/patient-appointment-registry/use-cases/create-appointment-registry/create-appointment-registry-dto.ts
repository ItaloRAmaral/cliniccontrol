import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

type Registry = Record<string, string>;

export class CreatePatientAppointmentRegistryDto {
  @IsObject()
  registry!: Registry;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date | null;
}
