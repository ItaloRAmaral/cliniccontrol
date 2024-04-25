import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryControllerOutputDto {
  @IsString()
  message!: string;
}
