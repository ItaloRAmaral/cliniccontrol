import { IsString } from 'class-validator';

export class UpdatePatientAppointmentRegistryControllerInputDto {
  @IsString()
  id!: string;
}
