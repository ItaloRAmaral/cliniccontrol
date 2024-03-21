import { IsString } from 'class-validator';

export class UpdatePatientAppointmentRegistryControllerOutputDto {
  @IsString()
  message!: string;
}
