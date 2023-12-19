import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

export class Registry {
  @IsString()
  observations!: string;
}

export class PatientAppointmentRegistryDto {
  @IsString()
  id!: string;

  @IsObject()
  registry!: Registry;

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
