import { IsObject, IsString } from 'class-validator';
import { Registry } from '../../entities/registry/dto';

export class CreatePatientAppointmentRegistryInputDto {
  @IsObject()
  registry!: Registry;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;
}
