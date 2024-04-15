import { IsString, IsUUID } from 'class-validator';

export class UpdatePatientAppointmentRegistryControllerInputDto {
  @IsString()
  id!: string;
}

export class UpdatePatientAppointmentRegistryParamsInputDto {
  @IsUUID()
  id!: string;
}
