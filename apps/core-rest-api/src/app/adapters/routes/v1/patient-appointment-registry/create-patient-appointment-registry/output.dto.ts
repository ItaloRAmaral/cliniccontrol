import { IsDate, IsObject, IsString } from 'class-validator';
import { Registry } from '../../../../../core/domains/patient-appointment-registry/entities/registry/dto';

export class CreatePatientAppointmentRegistryControllerOutputDto {
  @IsString()
  id!: string;

  @IsObject()
  registry!: Registry;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt?: Date | null;
}
