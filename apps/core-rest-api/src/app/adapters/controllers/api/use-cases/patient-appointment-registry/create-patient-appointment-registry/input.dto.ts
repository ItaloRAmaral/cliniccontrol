import { IsObject, IsString } from 'class-validator';
import { Registry } from '../../../../../../core/domains/patient-appointment-registry/entities/registry/dto';

export class CreatePatientAppointmentRegistryControllerBodyInputDto {
  @IsObject()
  registry!: Registry;

  @IsString()
  psychologistId!: string;

  @IsString()
  patientId!: string;
}
