import { IsString } from 'class-validator';

export class DeletePatientAppointmentRegistryInputDto {
  @IsString()
  id!: string;
}
