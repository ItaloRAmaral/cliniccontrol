import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryControllerInputDto {
  @IsString()
  id!: string;
}
