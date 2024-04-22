import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryParamsInputDto {
  @IsString()
  id!: string;
}
