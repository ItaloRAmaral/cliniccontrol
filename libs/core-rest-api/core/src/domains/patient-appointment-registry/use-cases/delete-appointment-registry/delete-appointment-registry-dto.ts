import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryDto {
  @IsString()
  id!: string;
}
