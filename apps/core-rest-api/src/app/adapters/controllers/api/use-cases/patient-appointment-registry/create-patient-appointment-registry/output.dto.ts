import { IsString } from 'class-validator';

export class CreatePatientAppointmentRegistryControllerOutputDto {
  @IsString()
  message!: string;
}
