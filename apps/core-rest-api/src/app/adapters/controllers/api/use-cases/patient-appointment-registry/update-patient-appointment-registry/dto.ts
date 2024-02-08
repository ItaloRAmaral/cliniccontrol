import { IsString } from 'class-validator';

export class UpdatePatientAppointmentRegistryInputDto {
  @IsString()
  id!: string;
}

export class UpdatePatientAppointmentRegistryOutputDto {
  @IsString()
  message!: string;
}
