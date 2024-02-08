import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryInputDto {
  @IsString()
  id!: string;
}

export class DeletePatientAppointmentRegistryOutputDto {
  @IsString()
  message!: string;
}
