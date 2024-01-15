import { IsObject, IsString } from 'class-validator';
import { Registry } from '../../entities/registry/dto';

export class CreatePatientAppointmentRegistryDto {
  @IsObject()
  registry!: Registry;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  // @IsOptional()
  // @IsDate()
  // updatedAt?: Date | null;
}
